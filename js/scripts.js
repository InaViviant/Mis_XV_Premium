// Cronómetro
function updateCountdown() {
    const targetDate = new Date('October 28, 2025 21:00:00').getTime();
    const now = new Date().getTime();
    const timeLeft = targetDate - now;
    
    if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    } else {
        // Si ya pasó la fecha
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        
        // Cambiar el texto del cronómetro
        document.querySelector('.countdown-subtitle').textContent = '¡Es mi día especial! 🎉';
    }
}

// Actualizar el cronómetro cada segundo
setInterval(updateCountdown, 1000);
updateCountdown(); // Ejecutar inmediatamente

// Carrusel de fotos
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');

function showSlide(index) {
    // Ocultar todas las slides
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Mostrar la slide seleccionada
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
    
    currentSlideIndex = index;
}

function changeSlide(direction) {
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }
    
    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    showSlide(index - 1);
}

// Auto-play del carrusel
function autoSlide() {
    changeSlide(1);
}

// Cambiar slide cada 5 segundos
setInterval(autoSlide, 5000);

// Función para mostrar mensaje de compartir fotos
function showShareMessage() {
    showCustomAlert(
        '¡Gracias por querer compartir! 📸',
        'En un caso real, este botón te llevaría directamente a un Google Drive compartido donde podrías subir todas las fotos de la fiesta. ¡Así podríamos guardar todos los momentos especiales juntos! 💕'
    );
}

// Función para mostrar mensaje de Google Maps
function showMapMessage() {
    showCustomAlert(
        '¡Perfecto! 🗺️',
        'En un caso real, este botón te llevaría directamente a Google Maps con la ubicación exacta del Salón de Fiestas "Los Jardines". Podrías ver la ruta desde tu ubicación y guardar la dirección en tu teléfono. ¡No te pierdas mi gran noche! 🎉'
    );
}

// Función para agregar evento al calendario
function addToCalendar() {
    showCustomAlert(
        '¡Perfecto! 📅',
        'En un caso real, este botón abriría tu calendario predeterminado y agregaría automáticamente el evento "Mis 15 Años - Melany Rodriguez" para el 28 de Octubre de 2025 a las 21:00. ¡No te olvides de reservar la fecha! 🎉'
    );
}

// Función para mostrar alertas personalizadas
function showCustomAlert(title, message) {
    // Crear overlay
    const overlay = document.createElement('div');
    overlay.className = 'alert-overlay';
    
    // Crear alert
    const alert = document.createElement('div');
    alert.className = 'custom-alert';
    alert.innerHTML = `
        <h3>${title}</h3>
        <p>${message}</p>
        <button onclick="closeCustomAlert()">¡Entendido!</button>
    `;
    
    document.body.appendChild(overlay);
    document.body.appendChild(alert);
    
    // Guardar referencias para poder cerrar
    window.currentOverlay = overlay;
    window.currentAlert = alert;
}

// Función para cerrar alertas personalizadas
function closeCustomAlert() {
    if (window.currentOverlay && window.currentAlert) {
        document.body.removeChild(window.currentOverlay);
        document.body.removeChild(window.currentAlert);
        window.currentOverlay = null;
        window.currentAlert = null;
    }
}

// Cerrar alert al hacer click en el overlay
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('alert-overlay')) {
        closeCustomAlert();
    }
});

// Función para copiar al portapapeles
function copyToClipboard(text) {
    // Crear un elemento temporal para copiar el texto
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    
    try {
        document.execCommand('copy');
        showCopyNotification('¡Copiado al portapapeles! ✓');
    } catch (err) {
        // Fallback para navegadores que no soportan execCommand
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                showCopyNotification('¡Copiado al portapapeles! ✓');
            }).catch(() => {
                showCopyNotification('No se pudo copiar. Selecciona y copia manualmente.');
            });
        } else {
            showCopyNotification('Selecciona y copia el texto manualmente.');
        }
    }
    
    document.body.removeChild(tempInput);
}

// Mostrar notificación de copiado
function showCopyNotification(message) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remover la notificación después de 2 segundos
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 2000);
}

// Función para controlar la música de fondo
function toggleMusic() {
    const music = document.getElementById('background-music');
    const toggle = document.querySelector('.music-toggle');
    
    if (music.paused) {
        music.play();
        toggle.textContent = '🔊';
    } else {
        music.pause();
        toggle.textContent = '🔇';
    }
}

// Función para seleccionar opción de asistencia
function selectAttendance(option) {
    // Remover selección anterior
    document.querySelectorAll('.radio-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Seleccionar la nueva opción
    const selectedOption = document.querySelector(`input[value="${option}"]`).closest('.radio-option');
    selectedOption.classList.add('selected');
    
    // Marcar el radio button
    document.querySelector(`input[value="${option}"]`).checked = true;
}

// Manejar envío del formulario RSVP
document.addEventListener('DOMContentLoaded', function() {
    const rsvpForm = document.getElementById('rsvpForm');
    
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener datos del formulario
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const attendance = document.querySelector('input[name="attendance"]:checked');
            
            // Validar campos
            if (!firstName || !lastName || !attendance) {
                showCustomAlert(
                    '¡Faltan datos! 📝',
                    'Por favor completá todos los campos obligatorios: nombre, apellido y si vas a asistir.'
                );
                return;
            }
            
            // Simular envío
            const submitBtn = document.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando... ⏳';
            
            setTimeout(() => {
                const attendanceText = attendance.value === 'yes' ? 'SÍ asistiré' : 'NO podré asistir';
                
                showCustomAlert(
                    '¡Confirmación enviada! ✅',
                    `Gracias ${firstName} ${lastName}! Tu respuesta "${attendanceText}" ha sido registrada. En un caso real, esta información se guardaría automáticamente en una planilla de Excel con todos los invitados. ¡Te esperamos en la fiesta! 🎉`
                );
                
                // Resetear formulario
                rsvpForm.reset();
                document.querySelectorAll('.radio-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 2000);
        });
    }
}
)

// Smooth scrolling para navegación
document.addEventListener('DOMContentLoaded', function() {
    // Efecto parallax
    initParallaxEffect();
    
    // Agregar efecto de aparición cuando los elementos entran en pantalla
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar todos los elementos con animación
    const animatedElements = document.querySelectorAll('.section-title, .icon, .date-card, .time-card, .transfer-card, .contact-item, .share-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });
    
    // Efecto de partículas flotantes
    createFloatingParticles();
});

// Inicializar efecto parallax
function initParallaxEffect() {
    const parallaxBg = document.querySelector('.parallax-bg');
    const presentacionSection = document.getElementById('presentacion');
    
    if (!parallaxBg || !presentacionSection) return;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const sectionHeight = presentacionSection.offsetHeight;
        const sectionTop = presentacionSection.offsetTop;
        
        // Solo aplicar el efecto cuando la sección está visible
        if (scrolled < sectionHeight + sectionTop) {
            const parallaxSpeed = 0.5;
            const yPos = scrolled * parallaxSpeed;
            
            // Aplicar transformación
            parallaxBg.style.transform = `translate3d(0, ${yPos}px, 0)`;
            
            // Calcular opacidad basada en el scroll
            const opacity = Math.max(0, 1 - (scrolled / sectionHeight));
            parallaxBg.style.opacity = opacity;
        }
    }
    
    // Usar requestAnimationFrame para mejor rendimiento
    let ticking = false;
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    function handleScroll() {
        requestTick();
        ticking = false;
    }
    
    // Escuchar el evento scroll
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Ejecutar una vez al cargar
    updateParallax();
}

// Crear partículas flotantes decorativas
function createFloatingParticles() {
    const particles = ['✨', '💖', '🌸', '💎', '⭐'];
    
    setInterval(() => {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = '100vh';
        particle.style.fontSize = '1.5rem';
        particle.style.opacity = '0.7';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1';
        particle.style.animation = 'floatUp 8s linear forwards';
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 8000);
    }, 3000);
}

// Agregar la animación CSS para las partículas flotantes
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.7;
        }
        90% {
            opacity: 0.7;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Agregar efectos de hover mejorados
document.addEventListener('DOMContentLoaded', function() {
    // Efecto de ripple para botones
    const buttons = document.querySelectorAll('.copy-btn, .carousel-btn, .share-button, .calendar-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Agregar estilo para el efecto ripple
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .copy-btn, .carousel-btn, .share-button, .calendar-btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

 // Variables para controles de música
        const music = document.getElementById('background-music');
        const musicToggle = document.getElementById('musicToggle');
        const volumeControl = document.getElementById('volumeControl');
        const volumeSlider = document.getElementById('volumeSlider');
        const volumePercentage = document.getElementById('volumePercentage');

        let isPlaying = false;
        let showingVolumeControl = false;

        // Configuración inicial del volumen
        music.volume = 0.5;
        updateVolumeSliderBackground();

        // Toggle música
        function toggleMusic() {
            if (music.paused) {
                music.play().then(() => {
                    isPlaying = true;
                    updateMusicIcon();
                }).catch(error => {
                    console.log('Error reproduciendo música:', error);
                });
            } else {
                music.pause();
                isPlaying = false;
                updateMusicIcon();
            }
        }

        // Actualizar icono del botón de música
        function updateMusicIcon() {
            if (music.volume === 0) {
                musicToggle.textContent = '🔇';
            } else if (isPlaying) {
                musicToggle.textContent = music.volume < 0.5 ? '🔉' : '🔊';
            } else {
                musicToggle.textContent = '🔇';
            }
        }

        // Mostrar/ocultar control de volumen
        function toggleVolumeControl() {
            showingVolumeControl = !showingVolumeControl;
            if (showingVolumeControl) {
                volumeControl.classList.add('show');
            } else {
                volumeControl.classList.remove('show');
            }
        }

        // Actualizar el fondo del slider basado en el valor
        function updateVolumeSliderBackground() {
            const value = volumeSlider.value;
            const percentage = (value / 100) * 100;
            volumeSlider.style.background = `linear-gradient(to right, #d4a574 0%, #e8c5a0 ${percentage}%, #f0f0f0 ${percentage}%, #f0f0f0 100%)`;
        }

        // Control de volumen
        function updateVolume() {
            const volume = volumeSlider.value / 100;
            music.volume = volume;
            volumePercentage.textContent = Math.round(volume * 100) + '%';
            updateVolumeSliderBackground();
            updateMusicIcon();
        }

        // Event listeners
        musicToggle.addEventListener('click', toggleMusic);

        // Click en el botón de música para mostrar controles
        musicToggle.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            toggleVolumeControl();
        });

        // Doble click para mostrar controles de volumen
        musicToggle.addEventListener('dblclick', (e) => {
            e.preventDefault();
            toggleVolumeControl();
        });

        // Hover para mostrar controles de volumen
        let hoverTimeout;
        musicToggle.addEventListener('mouseenter', () => {
            hoverTimeout = setTimeout(() => {
                if (!showingVolumeControl) {
                    toggleVolumeControl();
                }
            }, 1000); // Mostrar después de 1 segundo de hover
        });

        musicToggle.addEventListener('mouseleave', () => {
            clearTimeout(hoverTimeout);
        });

        // Control del slider de volumen
        volumeSlider.addEventListener('input', updateVolume);

        // Cerrar controles de volumen al hacer click fuera
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.music-controls') && showingVolumeControl) {
                toggleVolumeControl();
            }
        });

        // Atajos de teclado
        document.addEventListener('keydown', (e) => {
            // Espaciadora para pause/play
            if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
                e.preventDefault();
                toggleMusic();
            }
            
            // Flecha arriba/abajo para volumen
            if (e.code === 'ArrowUp') {
                e.preventDefault();
                const newVolume = Math.min(100, parseInt(volumeSlider.value) + 10);
                volumeSlider.value = newVolume;
                updateVolume();
                if (!showingVolumeControl) {
                    toggleVolumeControl();
                }
            }
            
            if (e.code === 'ArrowDown') {
                e.preventDefault();
                const newVolume = Math.max(0, parseInt(volumeSlider.value) - 10);
                volumeSlider.value = newVolume;
                updateVolume();
                if (!showingVolumeControl) {
                    toggleVolumeControl();
                }
            }
            
            // M para mutear
            if (e.code === 'KeyM') {
                e.preventDefault();
                if (music.volume > 0) {
                    volumeSlider.dataset.previousVolume = volumeSlider.value;
                    volumeSlider.value = 0;
                } else {
                    volumeSlider.value = volumeSlider.dataset.previousVolume || 50;
                }
                updateVolume();
            }
        });

        // Inicializar
        updateMusicIcon();

        // Tooltip para explicar cómo mostrar controles
        let tooltipTimeout;
        musicToggle.addEventListener('mouseenter', () => {
            tooltipTimeout = setTimeout(() => {
                // Crear tooltip
                const tooltip = document.createElement('div');
                tooltip.textContent = 'Mantén presionado para controles de volumen';
                tooltip.style.cssText = `
                    position: absolute;
                    bottom: 70px;
                    right: 0;
                    background: rgba(0,0,0,0.8);
                    color: white;
                    padding: 8px 12px;
                    border-radius: 8px;
                    font-size: 0.8rem;
                    white-space: nowrap;
                    pointer-events: none;
                    z-index: 1001;
                `;
                tooltip.className = 'music-tooltip';
                
                // Eliminar tooltip anterior si existe
                const existingTooltip = document.querySelector('.music-tooltip');
                if (existingTooltip) {
                    existingTooltip.remove();
                }
                
                musicToggle.parentElement.appendChild(tooltip);
                
                setTimeout(() => {
                    if (tooltip.parentElement) {
                        tooltip.remove();
                    }
                }, 3000);
            }, 2000);
        });

        musicToggle.addEventListener('mouseleave', () => {
            clearTimeout(tooltipTimeout);
        });