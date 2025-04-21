
import docx2txt
import fitz  # PyMuPDF
from io import BytesIO
import openai

def extraer_texto(file, content_type):
    if content_type == "application/pdf":
        with fitz.open(stream=file, filetype="pdf") as doc:
            return "\n".join([page.get_text() for page in doc])
    elif content_type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return docx2txt.process(BytesIO(file))
    elif content_type == "text/plain":
        return file.decode("utf-8")
    return "Formato no soportado"

def responder_con_ia(texto, pregunta, api_key):
    openai.api_key = api_key
    prompt = f"""
    Actúa como un buscador inteligente de documentos.
    Documento:
    {texto[:4000]}

    Pregunta:
    {pregunta}

    Responde solo lo necesario.
    """
    respuesta = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )
    return respuesta.choices[0].message.content.strip()
