document.addEventListener('DOMContentLoaded',()=>{
  // Initialize EmailJS
  try {
    emailjs.init('EqDZpPvMPNQKsV7Mu');
  } catch (e) {
    console.warn('EmailJS init failed:', e);
  }

  // Nav toggle for small screens
  const btn = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if(btn && links){
    btn.addEventListener('click',()=>{
      const header = document.querySelector('.site-header');
      const open = links.classList.toggle('is-open');
      if(open){
        header.classList.add('menu-open');
      } else {
        header.classList.remove('menu-open');
      }
    });
  }

  // mobile anchor toggle (Matrixia) - toggles same menu
  const mobileAnchor = document.querySelector('.mobile-anchor');
  if(mobileAnchor){
    mobileAnchor.addEventListener('click',()=>{
      const header = document.querySelector('.site-header');
      const open = links.classList.toggle('is-open');
      if(open) header.classList.add('menu-open'); else header.classList.remove('menu-open');
      mobileAnchor.setAttribute('aria-expanded', String(open));
    });
  }

  // IntersectionObserver for reveal animations
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  },{threshold:0.12});

  document.querySelectorAll('[data-animate]').forEach(el=>io.observe(el));

  // Animate skill bars
  document.querySelectorAll('.skill-fill').forEach(el=>{
    const v = el.getAttribute('data-skill') || 50;
    // small timeout to allow layout
    setTimeout(()=>el.style.width = v + '%', 600);
  });

  // Extract basic palette from background image and set CSS variables for harmony
  const bgImg = new Image();
  bgImg.crossOrigin = 'Anonymous';
  bgImg.src = 'assets/bg.jpg';
  bgImg.onload = ()=>{
    try{
      const c = document.createElement('canvas');
      c.width = Math.min(bgImg.width, 200);
      c.height = Math.min(bgImg.height, 200);
      const ctx = c.getContext('2d');
      ctx.drawImage(bgImg,0,0,c.width,c.height);
      const data = ctx.getImageData(0,0,c.width,c.height).data;
      // simple color aggregator: average of pixels + a secondary tint
      let r=0,g=0,b=0,count=0;
      for(let i=0;i<data.length;i+=4){
        const alpha = data[i+3];
        if(alpha<128) continue;
        r+=data[i]; g+=data[i+1]; b+=data[i+2]; count++;
      }
      if(count===0) return;
      r=Math.round(r/count); g=Math.round(g/count); b=Math.round(b/count);
      // compute a lighter tint for second accent
      const tint = (v,amt)=>Math.min(255, Math.round(v + amt));
      const r2 = tint(r,60), g2 = tint(g,60), b2 = tint(b,90);
      // muted color: desaturate average
      const avg = Math.round((r+g+b)/3);
      const rm = Math.round((r+avg)/2), gm = Math.round((g+avg)/2), bm = Math.round((b+avg)/2);
      // apply to document root
      const root = document.documentElement.style;
      root.setProperty('--accent', `rgb(${r},${g},${b})`);
      root.setProperty('--accent-2', `rgb(${r2},${g2},${b2})`);
      root.setProperty('--muted', `rgba(${rm},${gm},${bm},0.8)`);
      root.setProperty('--text', '#f5f9ff');
      root.setProperty('--overlay-rgb', `${Math.round(r*0.04)},${Math.round(g*0.07)},${Math.round(b*0.09)}`);
    }catch(e){
      // silently fail if canvas is blocked
      console.warn('No se pudo extraer la paleta del fondo:', e);
    }
  };

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const href = a.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        const target = document.querySelector(href);
        if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

  // Hide/show nav on scroll
  let lastScrollTop = 0;
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const nav = document.querySelector('.nav');
    const links = document.querySelector('.nav-links');
    const header = document.querySelector('.site-header');
    const mobileAnchor = document.querySelector('.mobile-anchor');
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      nav.classList.add('nav-hidden');
      // Close menu if open on scroll down
      if (links && links.classList.contains('is-open')) {
        links.classList.remove('is-open');
        if (header) header.classList.remove('menu-open');
        if (mobileAnchor) mobileAnchor.setAttribute('aria-expanded', 'false');
      }
    } else {
      nav.classList.remove('nav-hidden');
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });

  // ...existing content...

  // Handle back to blog button
  const backToBlogBtn = document.getElementById('back-to-blog');
  if (backToBlogBtn) {
    backToBlogBtn.addEventListener('click', () => {
      window.location.href = '../index.html';
    });
  }

  // Handle presupuestos button toast
  const presupuestosBtn = document.getElementById('presupuestos-btn');
  if (presupuestosBtn) {
    let toastVisible = false;
    let toastDiv = null;

    presupuestosBtn.addEventListener('click', () => {
      if (toastVisible) {
        // Remove toast
        if (toastDiv) {
          toastDiv.remove();
          toastDiv = null;
        }
        toastVisible = false;
      } else {
        // Create toast
        toastDiv = document.createElement('div');
        toastDiv.id = 'presupuestos-toast';
        toastDiv.style.position = 'fixed';
        toastDiv.style.top = '50%';
        toastDiv.style.left = '50%';
        toastDiv.style.transform = 'translate(-50%, -50%)';
        toastDiv.style.background = 'rgba(0, 0, 0, 0.85)';
        toastDiv.style.color = 'white';
        toastDiv.style.padding = '2rem';
        toastDiv.style.borderRadius = '12px';
        toastDiv.style.boxShadow = '0 8px 32px rgba(0,0,0,0.7)';
        toastDiv.style.zIndex = '10000';
        toastDiv.style.maxWidth = '90vw';
        toastDiv.style.maxHeight = '80vh';
        toastDiv.style.overflowY = 'auto';
        toastDiv.style.fontFamily = "'Montserrat', sans-serif";
        toastDiv.style.fontSize = '1rem';
        toastDiv.style.lineHeight = '1.5';

        // Embed content directly to avoid fetch issues locally
        const htmlContent = `
          <h1>Plantilla de Presupuestos</h1>
          <div class="price-list">
            Mantenimiento/limpieza: <span>10-15€</span><br />
            Eliminación virus+Antivirus: <span>12-18€</span><br />
            Pack completo Limpio+seguro*: <span>20-25€</span><br />
            Asesoramiento: <span>10€/Hora</span><br />
            Diagnóstico/Reparación*: <span>5-10€ (Consultar aclaración)</span><br />
            Montaje de PC*: <span>20-30€</span><br />
            Puesta en marcha*: <span>25€</span>
          </div>
          <div class="notes">
            <p><strong>Pack completo L+S*:</strong> Incluye Análisis de virus y su eliminación, mantenimiento del sistema y limpieza del equipo.</p>
            <p><strong>Diagnóstico*:</strong> En principio el Diagnóstico es gratuito si incluímos reparación, en caso contrario, su precio será de 5-10€</p>
            <p><strong>Montaje de PC*:</strong> Piezas no incluidas, el precio mostrado es de la mano de obra.</p>
            <p><strong>Puesta en marcha*:</strong> Incluye Formateo, Antivirus, aplicaciones a petición del usuario.</p>
            <p><strong>Desplazamiento:</strong> Si se requiere el servicio a domicilio, se suman +5€ al coste total para cubrir desplazamientos.</p>
            <p><strong>Garantía:</strong> Por la mano de obra, ofrezco una garantía de 7 días a partir del día en que te entregue el PC.</p>
          </div>
          <div class="payment">
            <span>Suelo aceptar pago en:</span>
            <img src="assets/efectivo.png" alt="Efectivo" title="Efectivo" />
          </div>
          <button class="close-toast">Cerrar</button>
        `;

        // Add styles for the content
        const style = document.createElement('style');
        style.textContent = `
          .price-list {
            font-weight: 600;
            color: white;
            font-size: 1.2rem;
            margin-bottom: 1rem;
            white-space: pre-line;
          }
          .price-list span {
            float: right;
            font-weight: 700;
            color: #4a90e2;
            font-size: 1.3rem;
            background: rgba(74, 144, 226, 0.15);
            padding: 0.1rem 0.6rem;
            border-radius: 6px;
            box-shadow: 0 0 8px rgba(74, 144, 226, 0.3);
            transition: background 0.3s ease;
          }
          .price-list span:hover {
            background: rgba(74, 144, 226, 0.3);
          }
          .notes {
            font-weight: 500;
            font-size: 1rem;
            margin-top: 1rem;
            line-height: 1.6;
            color: white;
            background: rgba(255, 255, 255, 0.1);
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
            transition: box-shadow 0.3s ease;
          }
          .notes:hover {
            box-shadow: 0 12px 36px rgba(0, 0, 0, 0.5);
          }
          .payment {
            margin-top: 2rem;
            display: flex;
            align-items: center;
            gap: 1rem;
            font-weight: 600;
            font-size: 1rem;
            color: white;
          }
          .payment img {
            width: 120px;
            height: auto;
          }
          .close-toast {
            display: inline-block;
            margin-top: 2rem;
            background: rgba(68, 68, 153, 0.2);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            color: white;
            border: 1px solid #4a90e2;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
          }
          .close-toast:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 20px rgba(0,0,0,0.2);
            background: rgba(68, 68, 153, 0.4);
          }
        `;
        toastDiv.appendChild(style);
        toastDiv.innerHTML += htmlContent;

        // Add event listener to close button
        const closeBtn = toastDiv.querySelector('.close-toast');
        if (closeBtn) {
          closeBtn.addEventListener('click', () => {
            toastDiv.remove();
            toastVisible = false;
          });
        }

        document.body.appendChild(toastDiv);
        toastVisible = true;
      }
    });
  }

  // Load and display reviews
  let reviews = [
    {
      "name": "María González",
      "stars": 5,
      "comment": "Excelente servicio de mantenimiento de PC. Mi ordenador va como nuevo después de la limpieza y optimización. Muy profesional y atento."
    },
    {
      "name": "Pedro Sánchez",
      "stars": 5,
      "comment": "Resolvió un problema grave con mi portátil que nadie más pudo arreglar. Recomiendo sus servicios al 100%."
    },
    {
      "name": "Carmen López",
      "stars": 4,
      "comment": "Buen trabajo en la configuración de mi red doméstica. Todo funciona perfectamente ahora. Solo tardó un poco más de lo esperado."
    },
    {
      "name": "Antonio Ruiz",
      "stars": 5,
      "comment": "Instaló Windows y todos los programas que necesitaba. Todo quedó perfecto y me explicó cómo mantenerlo. Excelente atención."
    },
    {
      "name": "Isabel Martín",
      "stars": 5,
      "comment": "Servicio de eliminación de virus muy efectivo. Mi PC estaba infectado y ahora funciona sin problemas. Gracias por la paciencia."
    }
  ];

  const reviewsList = document.getElementById('reviews-list');

  function renderReviews() {
    reviewsList.innerHTML = '';
    reviews.forEach((review, index) => {
      const reviewItem = document.createElement('div');
      reviewItem.className = 'review-item';
      reviewItem.innerHTML = `
        <h3>${review.name}</h3>
        <div class="review-stars">${'★'.repeat(review.stars)}${'☆'.repeat(5 - review.stars)}</div>
        <p class="review-comment">${review.comment}</p>
      `;
      reviewsList.appendChild(reviewItem);
    });
  }

  renderReviews();

  // Toggle review form
  const addReviewBtn = document.getElementById('add-review-btn');
  const reviewFormContainer = document.getElementById('review-form-container');
  if (addReviewBtn && reviewFormContainer) {
    addReviewBtn.addEventListener('click', () => {
      const isVisible = reviewFormContainer.style.display !== 'none';
      reviewFormContainer.style.display = isVisible ? 'none' : 'block';
    });
  }

  // Handle review form submission
  const reviewForm = document.getElementById('review-form');
  if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Procesando envío de reseña...');
      const name = document.getElementById('review-name').value.trim();
      const comment = document.getElementById('review-comment').value.trim();
      const rating = document.querySelector('input[name="rating"]:checked')?.value;

      if (name && comment && rating) {
        if (typeof emailjs !== 'undefined') {
          alert('Enviando email...');
          emailjs.send('service_f4ac4iu', 'template_6qz0zo5', {
            name: name,
            comment: comment,
            rating: rating
          }).then(() => {
            alert('Email enviado correctamente.');
            // On success, add to local reviews and render
            const newReview = {
              name: name,
              stars: parseInt(rating),
              comment: comment
            };
            reviews.unshift(newReview); // Add to beginning
            renderReviews();
            reviewForm.reset();
            reviewFormContainer.style.display = 'none';
            alert('Reseña enviada correctamente.');
          }).catch((error) => {
            console.error('Error al enviar la reseña:', error);
            alert('Error al enviar la reseña: ' + error.text);
          });
        } else {
          alert('EmailJS no está disponible. Revisa la conexión a internet o el script.');
        }
      } else {
        alert('Por favor, completa todos los campos: nombre, comentario y puntuación.');
      }
    });
  } else {
    console.warn('Formulario de reseñas no encontrado.');
  }
});
