Portafolio minimalista — instrucciones rápidas

Archivos principales:
- `index.html` — página principal
- `styles.css` — estilos
- `scripts.js` — animaciones y comportamiento
- `assets/` — coloca `me.png` y `cv.pdf` aquí
- `blog/` — artículos individuales (títulos ya creados; añade contenido en los archivos)

Cómo probar localmente (Windows PowerShell):

1) Abrir PowerShell en la carpeta `portfolio` y ejecutar un servidor simple con Python 3:

```pwsh
# desde C:\Users\mekka\Documents\GitHub\portfolio
python -m http.server 8000
```

2) Abrir en el navegador: http://localhost:8000

Notas:
- El fondo por defecto apunta a tu imagen de Descargas: `C:\Users\mekka\Downloads\Copilot_20250904_175800.png`. Edita `styles.css` si necesitas cambiar la ruta.
- Reemplaza `(Tu Nombre)` y los enlaces (email / LinkedIn) por tus datos reales.
- Coloca `assets/cv.pdf` para que el botón de descarga funcione.
