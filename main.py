
from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from utils import extraer_texto, responder_con_ia

app = FastAPI()

# Permitir acceso desde frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.post("/buscar/")
async def buscar(pregunta: str = Form(...), api_key: str = Form(...), archivo: UploadFile = None):
    if archivo:
        contenido = await archivo.read()
        texto = extraer_texto(contenido, archivo.content_type)
        respuesta = responder_con_ia(texto, pregunta, api_key)
        return {"respuesta": respuesta}
    else:
        return {"respuesta": "No se subió ningún documento"}
