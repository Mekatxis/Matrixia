Instrucciones de assets:

- Copia tu foto (la imagen flotante) a: assets/me.png
- Copia tu currículum en PDF a: assets/cv.pdf
- Opcional: si quieres una copia local del fondo, coloca la imagen de fondo en: assets/bg.jpg y abre `index.html` en un servidor local; también puedes cambiar la ruta en `styles.css`.

Nota importante sobre el fondo global:
El CSS referencia por defecto la imagen en Descargas usando la ruta absoluta del sistema Windows:
file:///C:/Users/mekka/Downloads/Copilot_20250904_175800.png
Si tu nombre de usuario no es "mekka" o la imagen está en otra carpeta, edita `styles.css` y ajusta la URL del background.

Para mayor comodidad hay un script PowerShell que copia la imagen desde Descargas a `assets/bg.jpg`.
Ejecuta esto desde PowerShell en la carpeta del proyecto:

```pwsh
.\copy_background.ps1
```

El script asume que la imagen se llama `Copilot_20250904_175800.png` y está en tu carpeta de Descargas.
