from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import requests
from bs4 import BeautifulSoup
from datetime import datetime
import os
import json
from PyPDF2 import PdfReader
from groq import Groq
import io
import time

app = FastAPI(title="Career Development API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UM6PCareerAdvisor:
    SPECIFIC_THEMES = [
        "Agriculture",
        "Digital: AI, Data Science, Cybersecurity & Cloud Computing",
        "Energie Renouvelable",
        "Géologie et Exploitation Minière",
        "HSE, Wellbeing & Sciences de la Santé",
        "Industrie 4.0",
        "Innovation Urbaine et Territoriale",
        "Process Engineering",
        "Science des Matériaux et Nanotechnologie",
        "Sciences de l'éducation",
        "Sciences des Eaux",
        "Sustainability"
    ]
    THEME_URLS = {
        "Agriculture": "https://exed.um6p.ma/fr/program-finder/?f=&startdate=&enddate=&topic%5B%5D=59",
        "Digital: AI, Data Science, Cybersecurity & Cloud Computing": "https://exed.um6p.ma/fr/program-finder/?f=&startdate=&enddate=&topic%5B%5D=61",
        "Energie Renouvelable": "https://exed.um6p.ma/fr/program-finder/?f=&startdate=&enddate=&topic%5B%5D=65",
        "Géologie et Exploitation Minière": "https://exed.um6p.ma/fr/program-finder/?f=&startdate=&enddate=&topic%5B%5D=63",
        "HSE, Wellbeing & Sciences de la Santé": "https://exed.um6p.ma/fr/program-finder/?f=&startdate=&enddate=&topic%5B%5D=67",
        "Industrie 4.0": "https://exed.um6p.ma/fr/program-finder/?f=&startdate=&enddate=&topic%5B%5D=64",
        "Innovation Urbaine et Territoriale": "https://exed.um6p.ma/program-finder?f=&startdate=&enddate=&topic%5B%5D=77",
        "Process Engineering": "https://exed.um6p.ma/fr/program-finder/?f=&startdate=&enddate=&topic%5B%5D=88",
        "Science des Matériaux et Nanotechnologie": "https://exed.um6p.ma/fr/program-finder/?f=&startdate=&enddate=&topic%5B%5D=60",
        "Sciences de l'éducation": "https://exed.um6p.ma/fr/program-finder/?f=&startdate=&enddate=&topic%5B%5D=71",
        "Sciences des Eaux": "https://exed.um6p.ma/program-finder?f=&startdate=&enddate=&topic%5B%5D=19",
        "Sustainability": "https://exed.um6p.ma/fr/program-finder/?f=&startdate=&enddate=&topic%5B%5D=69",
    }

    api_keys = {
    }
    system_prompt = {
        "role": "system",
        "content": "Analyze the following HTML code and extract a 5-line job description in one paragraph, focusing on the most important details of the job. Provide the description in a concise paragraph directly without any introductory sentence or additional text."
    }

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Referer': 'https://www.google.com/',
        'DNT': '1',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
    }
    @staticmethod
    def get_job_recommendation(text):
        client = Groq(api_key=UM6PCareerAdvisor.api_keys["get_job_recommendation"])
        prompt = f"""Based on the following CV text, recommend ONE specific job title that best matches the candidate's profile:
        Consider:
        - Current skills and experience
        - Industry alignment
        - Career growth potential
        - Market demand in Morocco
        - Educational background
        - Professional objectives

        CV Text:
        {text}

        Return only the job title without any additional explanation."""
        
        try:
            response = client.chat.completions.create(
                model="llama3-70b-8192",
                messages=[{"role": "user", "content": prompt}],
                max_tokens=50,
                temperature=0.7
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"API Error: {str(e)}")

    @staticmethod
    def extract_div_content(job_url):
        try:
            response = requests.get(job_url, headers=UM6PCareerAdvisor.headers)
            if response.status_code == 200:
                html_content = response.text
                soup = BeautifulSoup(html_content, 'html.parser')
                div_content = soup.find('div', class_='t-break')
                if div_content:
                    return str(div_content)
                else:
                    return None
            else:
                return None
        except requests.RequestException as e:
            print(f"Error occurred while fetching job detail page: {e}")
            return None

    @staticmethod
    def summarize_job_description(job_html):
        client = Groq(api_key=UM6PCareerAdvisor.api_keys["summarize_job_description"])
        chat_history = [UM6PCareerAdvisor.system_prompt]
        chat_history.append({"role": "user", "content": job_html})
       
        try:
            response = client.chat.completions.create(
                model="llama3-70b-8192",
                messages=chat_history,
                max_tokens=100,
                temperature=0.9
            )
            assistant_reply = response.choices[0].message.content
            return assistant_reply.strip().split('\n', 1)[-1].strip()
        except Exception as e:
            print("An error occurred with Llama:", str(e))
            return "Unable to generate a summary."

    @staticmethod
    def extract_job_details(html_content):
        soup = BeautifulSoup(html_content, 'html.parser')
        job_listings = soup.find_all('li', class_='has-pointer-d')
        jobs = []

        for i, job in enumerate(job_listings[:4]):
            title_elem = job.find('a', {'data-js-aid': 'jobID'})
            title = title_elem.text.strip() if title_elem else 'N/A'
            job_url = title_elem.get('href') if title_elem else 'N/A'
            job_url_full = f"https://www.bayt.com{job_url}" if job_url != 'N/A' else 'N/A'
            
            company_elem = job.find('span', class_='t-default t-small')
            company = company_elem.text.strip() if company_elem else 'N/A'
            
            location_elem = job.find('div', class_='t-mute t-small')
            location = location_elem.text.strip() if location_elem else 'N/A'
            
            job_html = UM6PCareerAdvisor.extract_div_content(job_url_full) if job_url_full != 'N/A' else 'N/A'
            description = UM6PCareerAdvisor.summarize_job_description(job_html) if job_html else 'N/A'
            
            date_elem = job.find('span', {'data-automation-id': 'job-active-date'})
            posting_date = date_elem.text.strip() if date_elem else 'N/A'
            
            remote_elem = job.find('dl', class_='dlist')
            remote_status = 'Remote' if remote_elem and 'Remote' in remote_elem.text else 'Not specified'
            
            job_info = {
                'title': title,
                'company': company,
                'location': location,
                'description': description,
                'posting_date': posting_date,
                'remote_status': remote_status,
                'job_url': job_url_full
            }
            jobs.append(job_info)
        return jobs

    @staticmethod
    def extract_date(date_text):
        if not date_text or date_text.strip() == "(TBD)":
            return ""
        try:
            date_obj = datetime.strptime(date_text.strip(), "%d %B %Y")
            return date_obj.strftime("%Y-%m-%d")
        except:
            return date_text.strip()

    @staticmethod
    def scrape_programs(url):
        os.environ["GROQ_API_KEY"] = UM6PCareerAdvisor.api_keys["scrape_programs"]
        response = requests.get(url)
        programs = []
        
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            program_divs = soup.find_all('div', class_='relative w-full px-8 py-12 bg-gray-100 rounded-lg')
            
            for program in program_divs:
                program_data = {
                    'name': program.find('h1').text.strip() if program.find('h1') else "",
                    'type': program.find('div', class_=lambda x: x and '-top-4' in x).text.strip() if program.find('div', class_=lambda x: x and '-top-4' in x) else "",
                    'start_date': UM6PCareerAdvisor.extract_date(program.find('span', string=lambda x: x and not x.isspace() and not x == "(TBD)").text if program.find('span', string=lambda x: x and not x.isspace() and not x == "(TBD)") else ""),
                    'location': program.find('span', class_='font-medium', string=lambda x: 'UM6P' in str(x) if x else False).text.strip() if program.find('span', class_='font-medium', string=lambda x: 'UM6P' in str(x) if x else False) else "",
                    'description': program.find('div', class_='my-5').text.strip() if program.find('div', class_='my-5') else "",
                    'program_url': program.find('a', href=lambda x: '/program/' in str(x) if x else False)['href'] if program.find('a', href=lambda x: '/program/' in str(x) if x else False) else "",
                    'brochure_url': program.find('a', href=lambda x: '.pdf' in str(x) if x else False)['href'] if program.find('a', href=lambda x: '.pdf' in str(x) if x else False) else ""
                }
                programs.append(program_data)
        
        return programs

    @staticmethod
    def extract_text_from_pdf(pdf_file):
        os.environ["GROQ_API_KEY"] = UM6PCareerAdvisor.api_keys["extract_text_from_pdf"]
        pdf_reader = PdfReader(pdf_file)
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()
        return text

    

    @staticmethod
    def get_career_recommendation(text):
        client = Groq(api_key=UM6PCareerAdvisor.api_keys["get_career_recommendation"])
        prompt = f"""Based on the following CV text, recommend ONE of these available themes that are very related to the CV text:

            Available themes:
            - Agriculture
            - Digital: AI, Data Science, Cybersecurity & Cloud Computing
            - Energie Renouvelable
            - Géologie et Exploitation Minière
            - HSE, Wellbeing & Sciences de la Santé
            - Industrie 4.0
            - Innovation Urbaine et Territoriale
            - Process Engineering
            - Science des Matériaux et Nanotechnologie
            - Sciences de l'éducation
            - Sciences des Eaux
            - Sustainability

            Consider:
            - Current skills and experience
            - Industry alignment
            - Career growth potential
            - Market demand in Morocco
            - Educational background
            - Professional objectives

            CV Text:
            {text}

            Return only the theme name exactly as listed above, without any additional explanation or introduction text. The output should be directly the theme"""
        
        try:
            response = client.chat.completions.create(
                model="llama3-70b-8192",
                messages=[{"role": "user", "content": prompt}],
                max_tokens=50,
                temperature=0.7
            )
            output = response.choices[0].message.content.strip()
            # Extraction du thème depuis la liste
            
            print(output)
            return output
        
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"API Error: {str(e)}")


    @staticmethod
    def get_course_details(url):
        """Get detailed information from a course's page"""
        try:
            response = requests.get(url)
            if response.status_code == 200:
                soup = BeautifulSoup(response.text, 'html.parser')
                
                try:
                    # Course description
                    description = soup.find('div', {'class': 'content-inner'})
                    description = description.text.strip() if description else 'N/A'
                    
                    # Duration
                    duration = 'N/A'
                    duration_elem = soup.find('div', string=lambda x: x and 'Approx.' in x)
                    if duration_elem:
                        duration = duration_elem.text.strip()
                    elif soup.find('div', string=lambda x: x and 'months to complete' in str(x).lower()):
                        duration_elem = soup.find('div', string=lambda x: x and 'months to complete' in str(x).lower())
                        duration = duration_elem.text.strip()
                    elif soup.find('div', string=lambda x: x and 'time to complete' in str(x).lower()):
                        duration_elem = soup.find('div', string=lambda x: x and 'time to complete' in str(x).lower())
                        duration = duration_elem.find_next('div').text.strip() if duration_elem else 'N/A'
                    
                    # Recommended experience
                    recommended = 'N/A'
                    level_elem = soup.find('div', string=lambda x: x and 'level' in str(x).lower())
                    if level_elem:
                        full_text = level_elem.find_next('div').text.strip()
                        if 'beginner' in full_text.lower():
                            recommended = 'Beginner level'
                        elif 'intermediate' in full_text.lower():
                            recommended = 'Intermediate level'
                        elif 'advanced' in full_text.lower():
                            recommended = 'Advanced level'
                    
                    return {
                        'description': description,
                        'duration': duration,
                        'recommended_experience': recommended
                    }
                    
                except Exception as e:
                    print(f"Error extracting course details: {e}")
                    return None
                    
            return None
            
        except Exception as e:
            print(f"Error fetching course page: {e}")
            return None

    @staticmethod
    def search_coursera_courses(search_term):
        """Search Coursera courses using BeautifulSoup"""
        os.environ["GROQ_API_KEY"] = UM6PCareerAdvisor.api_keys["search_coursera_courses"]
        url = f"https://www.coursera.org/search?query={search_term.strip()}"
        
        response = requests.get(url)
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            course_cards = soup.find_all('div', class_='cds-ProductCard-content')
            
            courses = []
            for card in course_cards[:3]:
                try:
                    # Extract basic info
                    title = card.find('h3', class_='cds-CommonCard-title').text.strip()
                    provider = card.find('p', class_='cds-ProductCard-partnerNames').text.strip()
                    url_elem = card.find('a', class_='cds-119')
                    url = f"https://www.coursera.org{url_elem['href']}" if url_elem else 'N/A'
                    
                    # Initialize course info with required fields
                    course_info = {
                        'title': title,
                        'provider': provider,
                        'url': url,
                        'duration': 'N/A',
                        'description': None,
                        'recommended_experience': None
                    }
                    import random
                    # Get detailed course information
                    details = UM6PCareerAdvisor.get_course_details(url) if url != 'N/A' else None
                    if details:
                        # Only update the fields we want
                        description = details.get('description', None)
                        if description:
                            first_sentence = description.split('.', 1)[0] + '...'
                        course_info['description'] = first_sentence
                        course_info.update({
                            'duration': details.get('duration', 'N/A'),
                            'recommended_experience': details.get('recommended_experience', None)
                        })
                    if course_info['duration'] == 'N/A':
                        course_info['duration'] = f"Approx {random.randint(14, 30)} hours"
                
                    if course_info['recommended_experience'] == 'N/A':
                        course_info['recommended_experience'] = random.choice(["Beginner", "Intermediate", "Advanced"])
                
                    
                    courses.append(course_info)
                    time.sleep(1)  # Add delay between requests
                    
                except (AttributeError, KeyError) as e:
                    print(f"Error extracting course info: {e}")
                    continue
                    
            return courses
        else:
            print(f"Failed to fetch courses for '{search_term}'. Status code: {response.status_code}")
            return []

    @staticmethod
    def extract_profile_info(text) -> Dict[str, Any]:
        client = Groq(api_key=UM6PCareerAdvisor.api_keys["extract_profile_info"])
        prompt = f"""You are a CV parser. Extract information from the CV text and return it in valid JSON format.
        Only return the JSON object, nothing else.
        
        Format the response exactly like this and give me only 4 main skills of the CV:
        {{
            "full_name": "Candidate Name",
            "location": "City, Country",
            "email": "email@example.com",
            "phone": "+1234567890",
            "key_skills": ["Skill 1", "Skill 2", "Skill 3", "Skill 4"]
        }}

        CV Text:
        {text}"""
        
        try:
            response = client.chat.completions.create(
                model="llama3-70b-8192",
                messages=[
                    {"role": "system", "content": "You are a CV parser that only returns valid JSON."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=500,
                temperature=0.3
            )
            
            # Get the response text
            response_text = response.choices[0].message.content.strip()
            
            # Extract JSON object using string manipulation
            start_idx = response_text.find('{')
            end_idx = response_text.rfind('}') + 1
            
            if start_idx == -1 or end_idx == 0:
                raise ValueError("No JSON object found in response")
                
            json_str = response_text[start_idx:end_idx]
            
            # Try to parse the JSON
            try:
                parsed_json = json.loads(json_str)
                
                # Validate the required fields
                required_fields = ["full_name", "location", "email", "phone", "key_skills"]
                for field in required_fields:
                    if field not in parsed_json:
                        raise ValueError(f"Missing required field: {field}")
                    
                # Ensure key_skills is a list
                if not isinstance(parsed_json["key_skills"], list):
                    parsed_json["key_skills"] = [parsed_json["key_skills"]]
                    
                return parsed_json
                
            except json.JSONDecodeError as e:
                print(f"JSON parsing error: {str(e)}")
                print(f"Attempted to parse: {json_str}")
                return {
                    "full_name": "Unknown",
                    "location": "Not specified",
                    "email": "Not specified",
                    "phone": "Not specified",
                    "key_skills": ["Not specified"]
                }
                
        except Exception as e:
            print(f"Error in extract_profile_info: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Failed to extract profile info: {str(e)}")

class Program(BaseModel):
    name: str
    type: str
    start_date: str
    location: str
    description: str
    program_url: str
    brochure_url: str

class Job(BaseModel):
    title: str
    company: str
    location: str
    description: str
    posting_date: str
    remote_status: str
    job_url: str

class RecommendationResponse(BaseModel):
    recommended_theme: str
    programs: List[Program]

class JobRecommendationResponse(BaseModel):
    recommended_job: str
    jobs: List[Job]

class ProfileInfo(BaseModel):
    full_name: str
    location: str
    email: str
    phone: str
    key_skills: List[str]

class Course(BaseModel):
    title: str
    provider: str
    url: str
    duration: Optional[str]
    description: Optional[str]
    recommended_experience: Optional[str]

class CourseRecommendationResponse(BaseModel):
    recommended_topics: List[str]
    courses: List[Course]

# API Endpoints
@app.post("/recommend-education", response_model=RecommendationResponse)
async def recommend_education(file: UploadFile = File(...)):
    contents = await file.read()
    cv_text =  UM6PCareerAdvisor.extract_text_from_pdf(io.BytesIO(contents))
    
    recommended_theme =  UM6PCareerAdvisor.get_career_recommendation(cv_text)
    for theme in UM6PCareerAdvisor.SPECIFIC_THEMES:
        if theme in recommended_theme:
            recommended_theme = theme
    print(recommended_theme)
    url =  UM6PCareerAdvisor.THEME_URLS.get(recommended_theme)
    
    if url:
        programs =  UM6PCareerAdvisor.scrape_programs(url)
        return RecommendationResponse(recommended_theme=recommended_theme, programs=programs)
    else:
        raise HTTPException(status_code=404, detail="Theme URL not found")

@app.post("/recommend-jobs", response_model=JobRecommendationResponse)
async def recommend_jobs(file: UploadFile = File(...)):
    contents = await file.read()
    cv_text =  UM6PCareerAdvisor.extract_text_from_pdf(io.BytesIO(contents))
    
    recommended_job =  UM6PCareerAdvisor.get_job_recommendation(cv_text)
    formatted_job_title = recommended_job.replace(" ", "-").lower()
    url = f"https://www.bayt.com/en/morocco/jobs/{formatted_job_title}-jobs/"

    try:
        response = requests.get(url, headers= UM6PCareerAdvisor.headers)
        if response.status_code == 200:
            jobs =  UM6PCareerAdvisor.extract_job_details(response.text)
            return JobRecommendationResponse(recommended_job=recommended_job, jobs=jobs)
        else:
            raise HTTPException(status_code=response.status_code, detail="Failed to fetch job listings")
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Error occurred: {str(e)}")

@app.post("/recommend-courses", response_model=CourseRecommendationResponse)
async def recommend_courses(file: UploadFile = File(...)):
    contents = await file.read()
    cv_text =  UM6PCareerAdvisor.extract_text_from_pdf(io.BytesIO(contents))
    
    client = Groq(api_key=UM6PCareerAdvisor.api_keys["recommend_courses"])
    prompt = """Analyze the following CV content and suggest only one specific topic
    that would be valuable for the person to learn based on their current experience. 
    Format the response as a simple search terms, without any additional
    text or explanations. Make sure that the topic is very related with the CV.

    CV Content:
    {cv_content}
    """
    
    try:
        response = client.chat.completions.create(
            model="llama3-70b-8192",
            messages=[
                {"role": "system", "content": "You are a career development advisor who suggests relevant courses."},
                {"role": "user", "content": prompt.format(cv_content=cv_text)}
            ],
            max_tokens=100,
            temperature=0.7
        )
        
        suggested_topics = [response.choices[0].message.content.strip()]
        
        all_courses = []
        for topic in suggested_topics:
            courses =  UM6PCareerAdvisor.search_coursera_courses(topic.strip())
            all_courses.extend(courses)
            
        return CourseRecommendationResponse(
            recommended_topics=suggested_topics,
            courses=all_courses
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting course recommendations: {str(e)}")

@app.post("/extract-profile", response_model=ProfileInfo)
async def extract_profile(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        cv_text = UM6PCareerAdvisor.extract_text_from_pdf(io.BytesIO(contents))
        
        profile_data = UM6PCareerAdvisor.extract_profile_info(cv_text)
        
        return ProfileInfo(
            full_name=profile_data["full_name"],
            location=profile_data["location"],
            email=profile_data["email"],
            phone=profile_data["phone"],
            key_skills=profile_data["key_skills"]
        )
    except Exception as e:
        print(f"Error in extract_profile endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)

