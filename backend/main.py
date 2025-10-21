from fastapi import FastAPI
from pydantic import BaseModel
from google import genai
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Initialize Gemini client with API key from environment variable
client = genai.Client(api_key=os.getenv("google_api_key"))

class Prompt(BaseModel):
    text: str

@app.post("/api/generate")
async def generate_response(prompt: Prompt):
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt.text,
    )
    return {"answer": response.text}
