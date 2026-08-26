// Navigation and State Management for Maqueta App Adopción Gatos

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const menuToggleBtn = document.getElementById('menuToggleBtn');
  const userModeToggleBtn = document.getElementById('userModeToggleBtn');
  const drawerUserSection = document.getElementById('drawerUserSection');

  // Bottom Nav Items
  const navAdopciones = document.getElementById('navAdopciones');
  const navArticulos = document.getElementById('navArticulos');
  const navAdd = document.getElementById('navAdd');

  // View Containers
  const feedTitle = document.getElementById('feedTitle');
  const postsFeed = document.getElementById('postsFeed');

  // Modals
  const loginModal = document.getElementById('loginModal');
  const profileModal = document.getElementById('profileModal');
  const adoptionDetailModal = document.getElementById('adoptionDetailModal');
  const myPostsModal = document.getElementById('myPostsModal');
  const genericModal = document.getElementById('genericModal');

  // State
  let isVisitor = false;
  let currentTab = 'adopciones'; // 'adopciones' | 'articulos'

  // Open Full Screen Menu Modal
  menuToggleBtn.addEventListener('click', () => {
    openModal('menuScreenModal');
  });

  // Toggle User / Visitor mode
  userModeToggleBtn.addEventListener('click', () => {
    isVisitor = !isVisitor;
    updateUserDrawerState();
  });

  function updateUserDrawerState() {
    if (isVisitor) {
      userModeToggleBtn.textContent = 'Ver como Usuario';
      drawerUserSection.innerHTML = `
        <div class="drawer-user-info">
          <div class="avatar-placeholder"><i class="fas fa-user-secret"></i></div>
          <div>
            <div style="font-weight: 700;">Visitante</div>
            <div class="user-status-badge" style="background:#f1f5f9; color:#6b7280;">Modo lectura</div>
          </div>
        </div>
      `;
      // Show login button, hide user specific options
      document.querySelectorAll('.drawer-user-only').forEach(el => el.style.display = 'none');
      document.querySelectorAll('.drawer-visitor-only').forEach(el => el.style.display = 'flex');
    } else {
      userModeToggleBtn.textContent = 'Ver como Visitante';
      drawerUserSection.innerHTML = `
        <div class="drawer-user-info">
          <div class="avatar-placeholder">M</div>
          <div>
            <div style="font-weight: 700;">María González</div>
            <div class="user-status-badge">Usuario registrado</div>
          </div>
        </div>
      `;
      document.querySelectorAll('.drawer-user-only').forEach(el => el.style.display = 'flex');
      document.querySelectorAll('.drawer-visitor-only').forEach(el => el.style.display = 'none');
    }
  }

  // Close buttons on all modals
  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.modal-overlay').forEach(modal => modal.classList.remove('active'));
    });
  });

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
  });

  // Global Function to Open Specific Modal
  window.openModal = function(modalId) {
    document.querySelectorAll('.modal-overlay').forEach(modal => modal.classList.remove('active'));
    const targetModal = document.getElementById(modalId);
    if (targetModal) {
      targetModal.classList.add('active');
    }
  };

  // Dynamic Filter Options Depending on Tab (Adopciones vs Artículos)
  function updateFilterDropdownOptions(type) {
    const filterSelect = document.getElementById('filterSelect');
    if (!filterSelect) return;

    if (type === 'adopciones') {
      filterSelect.innerHTML = `
        <option value="todos">Todos los gatos</option>
        <option value="edad_gatito">Edad: Gatito (&lt; 6 meses)</option>
        <option value="edad_joven">Edad: Joven (6 - 12 meses)</option>
        <option value="edad_adulto">Edad: Adulto (&gt; 1 año)</option>
        <option value="tamano_pequeno">Tamaño: Pequeño</option>
        <option value="tamano_mediano">Tamaño: Mediano</option>
        <option value="tamano_grande">Tamaño: Grande</option>
        <option value="social_verde">Socialización: Verde (Muy sociable)</option>
        <option value="social_celeste">Socialización: Celeste (Dócil)</option>
        <option value="social_amarillo">Socialización: Amarillo (Tímido)</option>
        <option value="social_rojo">Socialización: Rojo (Requiere manejo)</option>
        <option value="color">Color</option>
        <option value="ubicacion">Ubicación</option>
      `;
    } else {
      filterSelect.innerHTML = `
        <option value="todos">Todos los artículos</option>
        <option value="areneros">Areneros</option>
        <option value="comida">Comida</option>
        <option value="rascadores">Rascadores</option>
        <option value="accesorios">Artículos relacionados</option>
      `;
    }
  }

  // Switch Bottom Nav Tabs
  navAdopciones.addEventListener('click', () => {
    currentTab = 'adopciones';
    navAdopciones.classList.add('active');
    navArticulos.classList.remove('active');
    feedTitle.textContent = 'Publicaciones de Adopción';
    updateFilterDropdownOptions('adopciones');
    renderPosts('adopciones');
  });

  navArticulos.addEventListener('click', () => {
    currentTab = 'articulos';
    navArticulos.classList.add('active');
    navAdopciones.classList.remove('active');
    feedTitle.textContent = 'Intercambio de Artículos';
    updateFilterDropdownOptions('articulos');
    renderPosts('articulos');
  });

  navAdd.addEventListener('click', () => {
    showGenericModal('Crear nueva publicación', `
      <div style="text-align: center; padding: 10px 0;">
        <i class="fas fa-plus-circle" style="font-size: 3rem; color: var(--primary); margin-bottom: 12px;"></i>
        <p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 20px;">Selecciona el tipo de publicación que deseas realizar en la maqueta:</p>
        <div style="display:flex; gap:10px; flex-direction:column;">
          <button class="btn-primary" onclick="alert('Opción de maqueta: Crear adopción felina'); document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));">
            <i class="fas fa-cat"></i> Publicar Gato en Adopción
          </button>
          <button class="btn-outline" onclick="alert('Opción de maqueta: Crear artículo (Arenero, rascador, etc.)'); document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));">
            <i class="fas fa-box-open"></i> Publicar Artículo para Intercambio
          </button>
        </div>
      </div>
    `);
  });

  // Dummy Data for Posts
  const adoptionPosts = [
    {
      id: 1,
      name: 'Oliver',
      user: 'Camila R.',
      reputation: '★ 4.9 (18 reseñas)',
      date: 'Hace 2 días',
      image: './images/cat_orange.jpg',
      age: '4 Meses',
      color: 'Naranjito Atigrado',
      size: 'Pequeño',
      socialLevel: 'Verde',
      description: 'Oliver es un gatito rescatado muy cariñoso, juguetón y acostumbrado a vivir en interiores. Busca un hogar amoroso.',
      location: 'Providencia, Santiago'
    },
    {
      id: 2,
      name: 'Mimi',
      user: 'Felipe S.',
      reputation: '★ 4.8 (12 reseñas)',
      date: 'Hace 4 días',
      image: './images/cat_white.jpg',
      age: '2 Meses',
      color: 'Blanca con Gris',
      size: 'Pequeño',
      socialLevel: 'Celeste',
      description: 'Mimi es curiosa, dócil y se lleva de maravilla con otros animales. Cuenta con primera vacuna y desparasitación.',
      location: 'Ñuñoa, Santiago'
    }
  ];

  const itemPosts = [
    {
      id: 101,
      name: 'Arenero Automático Enclosed',
      user: 'Gonzalo M.',
      reputation: '★ 5.0 (8 reseñas)',
      date: 'Hace 1 día',
      image: './images/cat_litter_box.jpg',
      category: 'Artículos',
      description: 'Arenero automático en excelente estado. Ideal para intercambio por alimento de calidad o rascador mediano.',
      location: 'Las Condes, Santiago'
    }
  ];

  function renderPosts(type) {
    postsFeed.innerHTML = '';
    const items = type === 'adopciones' ? adoptionPosts : itemPosts;

    items.forEach(post => {
      const card = document.createElement('div');
      card.className = 'post-card';
      
      if (type === 'adopciones') {
        let socialColorClass = 'social-verde';
        if (post.socialLevel === 'Celeste') socialColorClass = 'social-celeste';
        if (post.socialLevel === 'Amarillo') socialColorClass = 'social-amarillo';
        if (post.socialLevel === 'Rojo') socialColorClass = 'social-rojo';

        card.innerHTML = `
          <div class="post-card-img-wrapper">
            <span class="badge-tag adopcion">Adopción</span>
            <img src="${post.image}" alt="${post.name}">
          </div>
          <div class="post-card-body">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div class="post-card-title">${post.name}</div>
              <span class="post-social-badge ${socialColorClass}">${post.socialLevel}</span>
            </div>
            <div class="post-card-meta">
              <span><i class="fas fa-map-marker-alt"></i> ${post.location}</span>
              <span><i class="fas fa-clock"></i> ${post.date}</span>
            </div>
            <p style="font-size:0.85rem; color:var(--text-muted); line-clamp:2; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">
              ${post.description}
            </p>
          </div>
        `;
        card.addEventListener('click', () => openAdoptionDetail(post));
      } else {
        card.innerHTML = `
          <div class="post-card-img-wrapper">
            <span class="badge-tag articulo">Artículo</span>
            <img src="${post.image}" alt="${post.name}">
          </div>
          <div class="post-card-body">
            <div class="post-card-title">${post.name}</div>
            <div class="post-card-meta">
              <span><i class="fas fa-map-marker-alt"></i> ${post.location}</span>
              <span><i class="fas fa-user"></i> ${post.user}</span>
            </div>
            <p style="font-size:0.85rem; color:var(--text-muted); line-clamp:2;">
              ${post.description}
            </p>
          </div>
        `;
        card.addEventListener('click', () => showGenericModal(`Artículo: ${post.name}`, `
          <div class="gallery-container">
            <img src="${post.image}" alt="${post.name}">
          </div>
          <div class="publisher-card">
            <div class="publisher-info">
              <div class="publisher-avatar">${post.user.charAt(0)}</div>
              <div>
                <div style="font-weight:700;">${post.user}</div>
                <div class="reputation-badge">${post.reputation}</div>
              </div>
            </div>
            <span style="font-size:0.8rem; color:var(--text-muted);">${post.date}</span>
          </div>
          <p style="font-size:0.95rem; margin-bottom:12px;"><strong>Ubicación:</strong> ${post.location}</p>
          <p style="font-size:0.95rem; color:var(--text-main); margin-bottom:20px;">${post.description}</p>
          <div class="action-buttons-group">
            <button class="btn-primary" onclick="alert('¡Solicitud enviada!'); document.querySelectorAll('.modal-overlay').forEach(m=>m.classList.remove('active'));"><i class="fas fa-heart"></i> Solicitar</button>
            <button class="btn-outline" onclick="alert('Guardado en favoritos');"><i class="fas fa-bookmark"></i> Guardar</button>
          </div>
        `));
      }

      postsFeed.appendChild(card);
    });
  }

  // Open Adoption Post Detail Modal
  function openAdoptionDetail(post) {
    document.getElementById('detailPetName').textContent = post.name;
    document.getElementById('detailImage').src = post.image;
    document.getElementById('detailUser').textContent = post.user;
    document.getElementById('detailReputation').textContent = post.reputation;
    document.getElementById('detailDate').textContent = post.date;
    document.getElementById('detailAge').textContent = post.age;
    document.getElementById('detailColor').textContent = post.color;
    document.getElementById('detailSize').textContent = post.size;
    document.getElementById('detailDescription').textContent = post.description;
    document.getElementById('detailLocation').textContent = post.location;

    // Socialization Index Highlighting (Verde, Celeste, Amarillo, Rojo)
    const pills = document.querySelectorAll('#socialPills .social-pill');
    pills.forEach(pill => {
      if (pill.dataset.level === post.socialLevel) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });

    adoptionDetailModal.classList.add('active');
  }

  // Show Generic Modal
  function showGenericModal(title, htmlBody) {
    document.getElementById('genericTitle').textContent = title;
    document.getElementById('genericBody').innerHTML = htmlBody;
    genericModal.classList.add('active');
  }

  // Profile View Tab Switching (Adopción / Artículos)
  window.switchProfileTab = function(tabType) {
    const btnAdop = document.getElementById('profileTabAdop');
    const btnArt = document.getElementById('profileTabArt');
    const container = document.getElementById('profilePostsContainer');

    if (tabType === 'adopciones') {
      btnAdop.classList.add('active');
      btnArt.classList.remove('active');
      container.innerHTML = `
        <div class="post-card" style="margin-top:10px;">
          <div class="post-card-img-wrapper" style="height:120px;">
            <img src="./images/cat_orange.jpg" alt="Oliver">
          </div>
          <div class="post-card-body">
            <div style="font-weight:700;">Oliver (En Adopción)</div>
            <div style="font-size:0.8rem; color:var(--text-muted);">Publicado hace 2 días</div>
          </div>
        </div>
      `;
    } else {
      btnArt.classList.add('active');
      btnAdop.classList.remove('active');
      container.innerHTML = `
        <div class="post-card" style="margin-top:10px;">
          <div class="post-card-img-wrapper" style="height:120px;">
            <img src="./images/cat_litter_box.jpg" alt="Arenero">
          </div>
          <div class="post-card-body">
            <div style="font-weight:700;">Arenero Automático</div>
            <div style="font-size:0.8rem; color:var(--text-muted);">Publicado hace 1 día</div>
          </div>
        </div>
      `;
    }
  };

  // Show Requests for a Post in "Mis Publicaciones"
  window.showRequestsForPost = function(postName) {
    showGenericModal(`Solicitudes para: ${postName}`, `
      <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:14px;">Solicitudes recibidas de otros usuarios en la maqueta:</p>
      <div class="request-item">
        <div>
          <div style="font-weight:700;">Andrea P.</div>
          <div style="font-size:0.8rem; color:var(--text-muted);">"Tengo espacio amplio y experiencia con gatos"</div>
          <div style="font-size:0.75rem; color:#eab308;">★ 4.9 Reputación</div>
        </div>
        <button class="btn-primary" style="padding:6px 12px; font-size:0.8rem;" onclick="alert('Solicitud de Andrea P. Aceptada. El chat ahora está activo.'); document.querySelectorAll('.modal-overlay').forEach(m=>m.classList.remove('active'));">Aceptar</button>
      </div>
      <div class="request-item">
        <div>
          <div style="font-weight:700;">Roberto M.</div>
          <div style="font-size:0.8rem; color:var(--text-muted);">"Quiero adoptar a Oliver para hacerle compañía a mi gata"</div>
          <div style="font-size:0.75rem; color:#eab308;">★ 4.7 Reputación</div>
        </div>
        <button class="btn-primary" style="padding:6px 12px; font-size:0.8rem;" onclick="alert('Solicitud de Roberto M. Aceptada.'); document.querySelectorAll('.modal-overlay').forEach(m=>m.classList.remove('active'));">Aceptar</button>
      </div>
    `);
  };

  // Dynamic filter chips logic
  document.querySelectorAll('.filter-chips .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-chips .chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });

  // Side Drawer Helper Functions (clean HTML calls)
  window.openMyRequestsModal = function() {
    sideDrawerOverlay.classList.remove('active');
    showGenericModal('Mis Solicitudes', `
      <div style="padding:10px 0;">
        <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:12px;">Solicitudes que has enviado a otras publicaciones:</p>
        <div class="request-item">
          <div>
            <div style="font-weight:700;">Solicitud por Gatita Mimi</div>
            <div style="font-size:0.8rem; color:var(--text-muted);">Publicado por Felipe S.</div>
            <span class="badge-tag" style="position:static; background:#f59e0b;">En revisión</span>
          </div>
        </div>
      </div>
    `);
  };

  window.openChatModal = function() {
    sideDrawerOverlay.classList.remove('active');
    showGenericModal('Chat (Solicitudes Aceptadas)', `
      <div style="padding:10px 0;">
        <div class="request-item" onclick="alert('Abriendo sala de chat conversacional con Camila R.')" style="cursor:pointer;">
          <div style="display:flex; gap:10px; align-items:center;">
            <div class="publisher-avatar">C</div>
            <div>
              <div style="font-weight:700;">Camila R. (Adopción Oliver)</div>
              <div style="font-size:0.8rem; color:var(--social-verde);">¡Solicitud Aceptada! Pulsa para chatear</div>
            </div>
          </div>
          <i class="fas fa-chevron-right" style="color:var(--text-muted);"></i>
        </div>
      </div>
    `);
  };

  window.openFormModal = function() {
    sideDrawerOverlay.classList.remove('active');
    showGenericModal('Mi Formulario de Adopción', `
      <form onsubmit="event.preventDefault(); alert('Formulario actualizado con éxito'); document.querySelectorAll('.modal-overlay').forEach(m=>m.classList.remove('active'));">
        <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:12px;">Completa tus datos para agilizar tus solicitudes de adopción:</p>
        <div class="form-group">
          <label>¿Tienes experiencia previa con gatos?</label>
          <select class="form-control"><option>Sí, actualmente tengo</option><option>Sí, en el pasado</option><option>No, sería mi primer gato</option></select>
        </div>
        <div class="form-group">
          <label>Tipo de vivienda</label>
          <select class="form-control"><option>Casa con jardín protegido</option><option>Departamento con mallas de seguridad</option><option>Otro</option></select>
        </div>
        <button class="btn-primary" type="submit">Guardar Formulario</button>
      </form>
    `);
  };

  window.openAccountModal = function() {
    sideDrawerOverlay.classList.remove('active');
    showGenericModal('Mi Cuenta', `
      <div style="padding:10px 0;">
        <div class="form-group"><label>Nombre completo</label><input type="text" class="form-control" value="María González"></div>
        <div class="form-group"><label>Correo electrónico</label><input type="email" class="form-control" value="maria.gonzalez@example.com"></div>
        <div class="form-group"><label>Teléfono de contacto</label><input type="text" class="form-control" value="+56 9 1234 5678"></div>
        <button class="btn-primary" onclick="alert('Datos de cuenta actualizados'); document.querySelectorAll('.modal-overlay').forEach(m=>m.classList.remove('active'));">Guardar Cambios</button>
      </div>
    `);
  };

  window.openSavedPostsModal = function() {
    sideDrawerOverlay.classList.remove('active');
    showGenericModal('Mis Publicaciones Guardadas', `
      <div style="padding:10px 0;">
        <div class="post-card">
          <div class="post-card-img-wrapper" style="height:120px;">
            <img src="./images/cat_white.jpg" alt="Mimi">
          </div>
          <div class="post-card-body">
            <div style="font-weight:700;">Mimi (Guardado)</div>
            <div style="font-size:0.8rem; color:var(--text-muted);">Ñuñoa, Santiago</div>
          </div>
        </div>
      </div>
    `);
  };

  // Filter Posts via Select Menu
  window.filterPosts = function(filterValue) {
    if (filterValue === 'areneros' || filterValue === 'rascadores' || filterValue === 'accesorios') {
      currentTab = 'articulos';
      navArticulos.classList.add('active');
      navAdopciones.classList.remove('active');
      feedTitle.textContent = `Intercambio de Artículos (${filterValue.charAt(0).toUpperCase() + filterValue.slice(1)})`;
      renderPosts('articulos');
    } else {
      currentTab = 'adopciones';
      navAdopciones.classList.add('active');
      navArticulos.classList.remove('active');
      feedTitle.textContent = `Publicaciones de Adopción (${filterValue.charAt(0).toUpperCase() + filterValue.slice(1)})`;
      renderPosts('adopciones');
    }
  };

  // Open Publication Detail from "Mis Publicaciones"
  window.openMyPostDetail = function(postId) {
    document.getElementById('myPostsModal').classList.remove('active');
    
    if (postId === 'oliver') {
      openAdoptionDetail({
        id: 1,
        name: 'Oliver (Tu Publicación)',
        user: 'María González (Tú)',
        reputation: '★ 4.9 (24 reseñas)',
        date: 'Hace 2 días',
        image: './images/cat_orange.jpg',
        age: '4 Meses',
        color: 'Naranjito Atigrado',
        size: 'Pequeño',
        socialLevel: 'Verde',
        description: 'Oliver es tu gato publicado en adopción. Acostumbrado a vivir dentro de casa. Puedes gestionar las solicitudes recibidas abajo.',
        location: 'Providencia, Santiago'
      });
      // Replace buttons with "Ver solicitudes" button for user's own post
      const actionGroup = document.querySelector('#adoptionDetailModal .action-buttons-group');
      if (actionGroup) {
        actionGroup.innerHTML = `
          <button class="btn-primary" onclick="showRequestsForPost('Oliver')">
            <i class="fas fa-envelope"></i> Ver solicitudes recibidas (2)
          </button>
          <button class="btn-outline" onclick="openModal('myPostsModal')">
            <i class="fas fa-arrow-left"></i> Volver a Mis Publicaciones
          </button>
        `;
      }
    } else if (postId === 'arenero') {
      showGenericModal('Arenero Automático (Tu Publicación)', `
        <div class="gallery-container">
          <img src="./images/cat_litter_box.jpg" alt="Arenero">
        </div>
        <div class="publisher-card">
          <div class="publisher-info">
            <div class="publisher-avatar">M</div>
            <div>
              <div style="font-weight:700;">María González (Tú)</div>
              <div class="reputation-badge">★ 4.9 (24 reseñas)</div>
            </div>
          </div>
          <span style="font-size:0.8rem; color:var(--text-muted);">Hace 1 día</span>
        </div>
        <p style="font-size:0.95rem; margin-bottom:12px;"><strong>Ubicación:</strong> Providencia, Santiago</p>
        <p style="font-size:0.95rem; color:var(--text-main); margin-bottom:20px;">Arenero automático publicado para intercambio por alimentos o rascador.</p>
        <div class="action-buttons-group">
          <button class="btn-primary" onclick="showRequestsForPost('Arenero Automático')">
            <i class="fas fa-envelope"></i> Ver solicitudes recibidas (1)
          </button>
          <button class="btn-outline" onclick="openModal('myPostsModal')">
            <i class="fas fa-arrow-left"></i> Volver a Mis Publicaciones
          </button>
        </div>
      `);
    } else if (postId === 'mimi') {
      openAdoptionDetail({
        id: 2,
        name: 'Mimi (Tu Publicación)',
        user: 'María González (Tú)',
        reputation: '★ 4.9 (24 reseñas)',
        date: 'Hace 4 días',
        image: './images/cat_white.jpg',
        age: '2 Meses',
        color: 'Blanca con Gris',
        size: 'Pequeño',
        socialLevel: 'Celeste',
        description: 'Mimi es tu gatita publicada en adopción.',
        location: 'Ñuñoa, Santiago'
      });
      const actionGroup = document.querySelector('#adoptionDetailModal .action-buttons-group');
      if (actionGroup) {
        actionGroup.innerHTML = `
          <button class="btn-primary" onclick="showRequestsForPost('Mimi')">
            <i class="fas fa-envelope"></i> Ver solicitudes recibidas (0)
          </button>
          <button class="btn-outline" onclick="openModal('myPostsModal')">
            <i class="fas fa-arrow-left"></i> Volver a Mis Publicaciones
          </button>
        `;
      }
    }
  };

  // Interactive Chat Message Sending
  window.sendChatMessage = function(event) {
    event.preventDefault();
    const input = document.getElementById('chatInputText');
    const messages = document.getElementById('chatMessages');
    if (!input || !input.value.trim()) return;

    const sentBubble = document.createElement('div');
    sentBubble.className = 'chat-bubble sent';
    sentBubble.textContent = input.value.trim();
    messages.appendChild(sentBubble);

    input.value = '';
    messages.scrollTop = messages.scrollHeight;

    // Simulate auto-reply in mockup
    setTimeout(() => {
      const replyBubble = document.createElement('div');
      replyBubble.className = 'chat-bubble received';
      replyBubble.textContent = '¡Perfecto! Me parece excelente. Nos mantenemos en contacto.';
      messages.appendChild(replyBubble);
      messages.scrollTop = messages.scrollHeight;
    }, 1000);
  };

  // Toggle View Mode for Mis Publicaciones (Cuadrícula vs Lista)
  window.toggleMyPostsView = function(mode) {
    const gridBtn = document.getElementById('myPostsGridBtn');
    const listBtn = document.getElementById('myPostsListBtn');
    const container = document.getElementById('myPostsContainer');

    if (mode === 'grid') {
      gridBtn.classList.add('active');
      listBtn.classList.remove('active');
      container.className = 'posts-grid';
    } else {
      listBtn.classList.add('active');
      gridBtn.classList.remove('active');
      container.className = 'posts-feed';
    }
  };

  // Initial Load
  updateUserDrawerState();
  updateFilterDropdownOptions('adopciones');
  renderPosts('adopciones');
});
