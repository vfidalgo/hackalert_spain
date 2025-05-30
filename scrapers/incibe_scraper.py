import os
from supabase import create_client
import requests
from bs4 import BeautifulSoup

# Configura Supabase
supabase = create_client(
    os.environ['SUPABASE_URL'],
    os.environ['SERVICE_ROLE_KEY']
)

def scrape_incibe():
    url = "https://www.incibe.es/alertas"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Ejemplo de extracción (ajustar según HTML real)
    for alerta in soup.select('.alert-item'):
        title = alerta.find('h3').text.strip()
        # ... extraer más datos
        
        # Insertar en Supabase
        supabase.table('incidentes').insert({
            "titulo": f"Alerta INCIBE: {title}",
            "tipo": "alerta",
            "gravedad": "alta",
            "fuente": "INCIBE"
        }).execute()

if __name__ == "__main__":
    scrape_incibe()
