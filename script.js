// ========== ESTADO GLOBAL ==========
        let isLoggedIn = false;
        let peopleCount = 1;
        const MAX_PEOPLE = 20;
        let selectedTime = null;
        let reservas = [];
        let reservaParaCancelar = null;
        let acaoPosLogin = null;
        let carrinho = [];
        let pratoAtual = null;

        // ========== MENU LATERAL ==========
        const menuToggle = document.getElementById('menuToggle');
        const sideMenu = document.getElementById('sideMenu');
        const closeMenu = document.getElementById('closeMenu');
        const overlay = document.getElementById('overlay');

        function openMenu() {
            sideMenu.classList.add('open');
            overlay.classList.add('active');
        }

        function closeMenuFunc() {
            sideMenu.classList.remove('open');
            overlay.classList.remove('active');
        }

        menuToggle.addEventListener('click', openMenu);
        closeMenu.addEventListener('click', closeMenuFunc);
        overlay.addEventListener('click', () => {
            closeMenuFunc();
            closeAllModals();
        });

        // ========== MODAIS BOOTSTRAP ==========
        const dishModal = new bootstrap.Modal(document.getElementById('dishModal'));
        const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
        const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));
        const reservaModal = new bootstrap.Modal(document.getElementById('reservaModal'));
        const settingsModal = new bootstrap.Modal(document.getElementById('settingsModal'));
        const confirmModal = new bootstrap.Modal(document.getElementById('confirmModal'));
        const reservasListModal = new bootstrap.Modal(document.getElementById('reservasListModal'));
        const cancelModal = new bootstrap.Modal(document.getElementById('cancelModal'));
        const loginRequiredModal = new bootstrap.Modal(document.getElementById('loginRequiredModal'));
        const messageModal = new bootstrap.Modal(document.getElementById('messageModal'));

        function closeAllModals() {
            dishModal.hide();
            cartModal.hide();
            loginModal.hide();
            registerModal.hide();
            reservaModal.hide();
            settingsModal.hide();
            confirmModal.hide();
            reservasListModal.hide();
            cancelModal.hide();
            loginRequiredModal.hide();
            messageModal.hide();
        }

        // ========== FUNÇÃO GENÉRICA DE MENSAGEM ==========
        function mostrarMensagem(tipo, titulo, texto) {
            const icon = document.getElementById('msgIcon');
            const title = document.getElementById('msgTitle');
            const text = document.getElementById('msgText');

            icon.className = 'modal-icon ' + tipo;
            switch (tipo) {
                case 'success': icon.textContent = '✓'; break;
                case 'warning': icon.textContent = '!'; break;
                case 'danger':  icon.textContent = '✕'; break;
                case 'info':    icon.textContent = 'i'; break;
                default:        icon.textContent = '✓';
            }

            const cores = {
                success: 'var(--success)',
                warning: 'var(--warning)',
                danger: 'var(--danger)',
                info: 'var(--info)'
            };
            title.style.color = cores[tipo] || 'var(--success)';

            title.textContent = titulo;
            text.textContent = texto;

            messageModal.show();
        }

        // ========== SEÇÃO CONDICIONAL (Favoritos / Cardápio) ==========
        function renderSecaoCondicional() {
            const container = document.getElementById('secaoCondicional');
            const secaoReservas = document.getElementById('secaoReservas');

            if (isLoggedIn) {
                // Usuário logado → Seus Favoritos + Seção de Reservas
                container.innerHTML = `
                    <div class="section-header">
                        <h2>Seus favoritos</h2>
                        <a href="#">Ver mais</a>
                    </div>
                    <div class="cards-grid">
                        <div class="card-wrapper">
                            <div class="card" onclick="openDish('Bife à parmigiana', 'R$ 85', 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80')">
                                <div class="favorite-badge">♥</div>
                                <img src="https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Bife à parmigiana">
                                <div class="card-body">
                                    <h3>Bife à parmigiana</h3>
                                    <p>Carne, molho e queijo</p>
                                    <span class="price">R$ 85</span>
                                </div>
                            </div>
                        </div>
                        <div class="card-wrapper">
                            <div class="card" onclick="openDish('Salmão ao molho de maracujá', 'R$ 52', 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80')">
                                <div class="favorite-badge">♥</div>
                                <img src="https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Salmão">
                                <div class="card-body">
                                    <h3>Salmão ao molho de maracujá</h3>
                                    <p>Peixe e molho especial</p>
                                    <span class="price">R$ 52</span>
                                </div>
                            </div>
                        </div>
                        <div class="card-wrapper">
                            <div class="card" onclick="openDish('Lasanha quatro queijos', 'R$ 68', 'https://images.unsplash.com/photo-1619895092538-128341789043?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80')">
                                <div class="favorite-badge">♥</div>
                                <img src="https://images.unsplash.com/photo-1619895092538-128341789043?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Lasanha">
                                <div class="card-body">
                                    <h3>Lasanha quatro queijos</h3>
                                    <p>Massa, molho e queijos</p>
                                    <span class="price">R$ 68</span>
                                </div>
                            </div>
                        </div>
                        <div class="card-wrapper">
                            <div class="card" onclick="openDish('Ceviche', 'R$ 35', 'https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80')">
                                <div class="favorite-badge">♥</div>
                                <img src="https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Ceviche">
                                <div class="card-body">
                                    <h3>Ceviche</h3>
                                    <p>Peixe fresco e limão</p>
                                    <span class="price">R$ 35</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                // Mostrar seção de reservas
                secaoReservas.style.display = 'block';
                renderReservasPageList();
            } else {
                // Usuário não logado → Cardápio
                container.innerHTML = `
                    <div class="section-header">
                        <h2>Cardápio</h2>
                        <a href="#">Ver mais</a>
                    </div>
                    <div class="cards-grid">
                        <div class="card" onclick="openDish('Brusquetas', 'R$ 22', 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80')">
                            <img src="https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Brusquetas">
                            <div class="card-body">
                                <h3>Brusquetas</h3>
                                <p>Pão, tomate e manjericão</p>
                                <span class="price">R$ 22</span>
                            </div>
                        </div>
                        <div class="card" onclick="openDish('Frango à passarinho', 'R$ 38', 'https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80')">
                            <img src="https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Frango à passarinho">
                            <div class="card-body">
                                <h3>Frango à passarinho</h3>
                                <p>Porção crocante</p>
                                <span class="price">R$ 38</span>
                            </div>
                        </div>
                        <div class="card" onclick="openDish('Peixe à delícia', 'R$ 55', 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80')">
                            <img src="https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Peixe">
                            <div class="card-body">
                                <h3>Peixe à delícia</h3>
                                <p>Peixe, creme e catupiry</p>
                                <span class="price">R$ 55</span>
                            </div>
                        </div>
                        <div class="card" onclick="openDish('Filé ao molho madeira', 'R$ 98', 'https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80')">
                            <img src="https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Filé">
                            <div class="card-body">
                                <h3>Filé ao molho madeira</h3>
                                <p>Carne e molho</p>
                                <span class="price">R$ 98</span>
                            </div>
                        </div>
                    </div>
                `;
                // Esconder seção de reservas
                secaoReservas.style.display = 'none';
            }
        }

        // ========== RENDERIZAR RESERVAS NA PÁGINA ==========
        function renderReservasPageList() {
            const container = document.getElementById('reservasPageList');
            if (!container) return;

            if (reservas.length === 0) {
                container.innerHTML = `
                    <div class="empty-reservas-page">
                        <p>Você ainda não tem reserva :(</p>
                        <p style="font-size:0.85rem;">Clique em "+ Nova reserva" para agendar uma visita ao Bellini.</p>
                    </div>
                `;
                return;
            }

            let html = '';
            [...reservas].reverse().forEach(reserva => {
                html += `
                    <div class="reservas-page-item">
                        <div class="info">
                            <strong>${reserva.date}</strong>
                            <span>${reserva.time} • ${reserva.people} pessoa(s)</span>
                        </div>
                        <button class="cancel-btn" onclick="abrirCancelamento(${reserva.id})">Cancelar</button>
                    </div>
                `;
            });
            container.innerHTML = html;
        }

        // Inicializar a seção condicional
        renderSecaoCondicional();

        // ========== USUÁRIO ==========
        document.getElementById('userIcon').addEventListener('click', () => {
            if (isLoggedIn) {
                settingsModal.show();
            } else {
                loginModal.show();
            }
        });

        document.getElementById('headerLoginBtn').addEventListener('click', () => {
            if (isLoggedIn) {
                settingsModal.show();
            } else {
                loginModal.show();
            }
        });

        document.getElementById('menuLoginBtn').addEventListener('click', (e) => {
            e.preventDefault();
            closeMenuFunc();
            if (isLoggedIn) settingsModal.show(); else loginModal.show();
        });

        // ========== CARRINHO ==========
        document.getElementById('cartBtn').addEventListener('click', () => {
            renderCart();
            cartModal.show();
        });

        function renderCart() {
            const container = document.getElementById('cartBody');
            const badge = document.getElementById('cartBadge');
            const totalItens = carrinho.reduce((sum, item) => sum + item.qty, 0);

            // Atualizar badge
            if (totalItens > 0) {
                badge.textContent = totalItens;
                badge.style.display = 'flex';
            } else {
                badge.style.display = 'none';
            }

            if (carrinho.length === 0) {
                container.innerHTML = `
                    <div class="cart-empty">
                        <span>:(</span>
                        <p>Seu carrinho está vazio.</p>
                        <p style="font-size:0.85rem;">Dê uma olhada no nosso cardápio e adicione um dos nossos pratos deliciosos!</p>
                    </div>
                `;
                return;
            }

            let html = '';
            let total = 0;
            carrinho.forEach((item, index) => {
                const preco = parseFloat(item.price.replace('R$ ', '').replace(',', '.'));
                total += preco * item.qty;
                html += `
                    <div class="cart-item">
                        <img src="${item.img}" alt="${item.name}">
                        <div class="item-info">
                            <strong>${item.name}</strong>
                            <span>${item.price}</span>
                        </div>
                        <div class="item-qty">
                            <button onclick="changeQty(${index}, -1)">−</button>
                            <span>${item.qty}</span>
                            <button onclick="changeQty(${index}, 1)">+</button>
                        </div>
                    </div>
                `;
            });

            html += `
                <div class="cart-total">
                    <span>Total:</span>
                    <span class="total-value">R$ ${total.toFixed(2).replace('.', ',')}</span>
                </div>
                <button class="btn btn-primary-custom w-100 mt-3" onclick="finalizarPedido()">
                    Finalizar Pedido
                </button>
            `;
            container.innerHTML = html;
        }

        function changeQty(index, delta) {
            carrinho[index].qty += delta;
            if (carrinho[index].qty <= 0) {
                carrinho.splice(index, 1);
            }
            renderCart();
        }

        function finalizarPedido() {
            if (carrinho.length === 0) return;
            cartModal.hide();
            carrinho = [];
            renderCart();
            mostrarMensagem('success', 'Pedido realizado!', 'Seu pedido foi enviado para a cozinha. Obrigado!');
        }

        // ========== RESERVA COM VERIFICAÇÃO DE LOGIN ==========
        document.getElementById('menuReservaBtn').addEventListener('click', (e) => {
            e.preventDefault();
            closeMenuFunc();
            tentarAbrirReserva();
        });

        document.getElementById('desktopReservaBtn').addEventListener('click', (e) => {
            e.preventDefault();
            tentarAbrirReserva();
        });

        function tentarAbrirReserva() {
            if (!isLoggedIn) {
                acaoPosLogin = 'reserva';
                loginRequiredModal.show();
            } else {
                openReserva();
            }
        }

        function goToLogin() {
            loginRequiredModal.hide();
            loginModal.show();
        }

        function openReserva() {
            generateTimeSlots();
            setMinDate();
            reservaModal.show();
        }

        // ========== LOGIN ==========
        function doLogin() {
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            if (email && password) {
                isLoggedIn = true;
                loginModal.hide();
                document.getElementById('profileEmail').textContent = email;
                
                // Atualizar a seção condicional e de reservas
                renderSecaoCondicional();
                
                if (acaoPosLogin === 'reserva') {
                    acaoPosLogin = null;
                    setTimeout(() => openReserva(), 300);
                } else {
                    mostrarMensagem('success', 'Login realizado!', 'Bem-vindo(a) de volta ao Bellini.');
                }
            } else {
                mostrarMensagem('warning', 'Campos vazios', 'Por favor, preencha e-mail e senha.');
            }
        }

        // ========== CADASTRO ==========
        function openRegister() {
            loginModal.hide();
            registerModal.show();
        }

        function doRegister() {
            const name = document.getElementById('regName').value;
            const surname = document.getElementById('regSurname').value;
            const phone = document.getElementById('regPhone').value;
            const email = document.getElementById('regEmail').value;
            const password = document.getElementById('regPassword').value;

            if (name && surname && phone && email && password) {
                isLoggedIn = true;
                registerModal.hide();
                document.getElementById('profileName').textContent = name + ' ' + surname;
                document.getElementById('profileEmail').textContent = email;
                document.getElementById('inputName').value = name;
                document.getElementById('inputSurname').value = surname;
                
                renderSecaoCondicional();
                
                if (acaoPosLogin === 'reserva') {
                    acaoPosLogin = null;
                    setTimeout(() => openReserva(), 300);
                } else {
                    mostrarMensagem('success', 'Cadastro realizado!', 'Bem-vindo(a), ' + name + '! Sua conta foi criada com sucesso.');
                }
            } else {
                mostrarMensagem('warning', 'Campos vazios', 'Por favor, preencha todos os campos para continuar.');
            }
        }

        // ========== LOGOUT ==========
        function doLogout() {
            isLoggedIn = false;
            settingsModal.hide();
            
            renderSecaoCondicional();
            
            mostrarMensagem('info', 'Até logo!', 'Você saiu da sua conta com sucesso.');
        }

        // ========== ATUALIZAR PERFIL ==========
        function updateProfile() {
            const name = document.getElementById('inputName').value;
            const surname = document.getElementById('inputSurname').value;
            document.getElementById('profileName').textContent = name + ' ' + surname;
            mostrarMensagem('success', 'Perfil atualizado!', 'Suas informações foram salvas com sucesso.');
        }

        // ========== DETALHE DO PRATO ==========
        function openDish(name, price, img) {
            pratoAtual = { name, price, img };
            document.getElementById('dishName').textContent = name;
            document.getElementById('dishPrice').textContent = price;
            document.getElementById('dishImg').src = img;
            document.getElementById('dishDesc').textContent = 'Delicioso prato preparado com ingredientes frescos e selecionados.';
            dishModal.show();
        }

        function addToCartFromModal() {
            if (!pratoAtual) return;
            // Verificar se já existe no carrinho
            const existente = carrinho.find(item => item.name === pratoAtual.name);
            if (existente) {
                existente.qty += 1;
            } else {
                carrinho.push({ ...pratoAtual, qty: 1 });
            }
            dishModal.hide();
            renderCart();
            mostrarMensagem('success', 'Adicionado!', 'O prato foi adicionado ao seu carrinho.');
        }

        // ========== RESERVA ==========
        function changePeople(delta) {
            peopleCount = Math.max(1, Math.min(MAX_PEOPLE, peopleCount + delta));
            document.getElementById('peopleCount').textContent = peopleCount;
        }

        function setMinDate() {
            const today = new Date();
            const yyyy = today.getFullYear();
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const dd = String(today.getDate()).padStart(2, '0');
            document.getElementById('reservaDate').min = `${yyyy}-${mm}-${dd}`;
        }

        function generateTimeSlots() {
            const times = ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'];
            const grid = document.getElementById('timeGrid');
            grid.innerHTML = '';
            times.forEach(time => {
                const btn = document.createElement('div');
                btn.className = 'time-btn';
                btn.textContent = time;
                btn.onclick = () => {
                    document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');
                    selectedTime = time;
                };
                grid.appendChild(btn);
            });
        }

        function confirmReserva() {
            const dateInput = document.getElementById('reservaDate').value;

            if (!selectedTime) {
                mostrarMensagem('warning', 'Horário não selecionado', 'Por favor, selecione um horário para sua reserva.');
                return;
            }
            if (!dateInput) {
                mostrarMensagem('warning', 'Data não selecionada', 'Por favor, escolha uma data no calendário.');
                return;
            }

            const [yyyy, mm, dd] = dateInput.split('-');
            const dateObj = new Date(yyyy, mm - 1, dd);
            const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
            const diaSemana = diasSemana[dateObj.getDay()];
            const dataFormatada = `${diaSemana}, ${dd}/${mm}/${yyyy}`;

            const novaReserva = {
                id: Date.now(),
                people: peopleCount,
                date: dataFormatada,
                time: selectedTime
            };
            reservas.push(novaReserva);

            document.getElementById('confPeople').textContent = peopleCount;
            document.getElementById('confDate').textContent = dataFormatada;
            document.getElementById('confTime').textContent = selectedTime;

            reservaModal.hide();
            confirmModal.show();

            // Atualizar a lista de reservas na página
            renderReservasPageList();

            selectedTime = null;
            peopleCount = 1;
            document.getElementById('peopleCount').textContent = peopleCount;
            document.getElementById('reservaDate').value = '';
        }

        function closeConfirmAndOpenList() {
            confirmModal.hide();
            renderReservasList();
            reservasListModal.show();
        }

        // ========== LISTA DE RESERVAS (MODAL) ==========
        function renderReservasList() {
            const container = document.getElementById('reservasListBody');

            if (reservas.length === 0) {
                container.innerHTML = `
                    <div class="empty-reservas">
                        <span>🍷</span>
                        <p>Você ainda não tem reservas.</p>
                        <p style="font-size:0.85rem;">Que tal agendar uma visita ao Bellini?</p>
                    </div>
                `;
                return;
            }

            let html = '';
            [...reservas].reverse().forEach(reserva => {
                html += `
                    <div class="reserva-item">
                        <div class="info">
                            <strong>${reserva.date}</strong>
                            <span>${reserva.time} • ${reserva.people} pessoa(s)</span>
                        </div>
                        <button class="cancel-btn" onclick="abrirCancelamento(${reserva.id})">Cancelar</button>
                    </div>
                `;
            });
            container.innerHTML = html;
        }

        function abrirCancelamento(id) {
            reservaParaCancelar = id;
            cancelModal.show();
        }

        document.getElementById('confirmCancelBtn').addEventListener('click', () => {
            if (reservaParaCancelar !== null) {
                reservas = reservas.filter(r => r.id !== reservaParaCancelar);
                reservaParaCancelar = null;
                cancelModal.hide();
                renderReservasList();
                renderReservasPageList();
                setTimeout(() => reservasListModal.show(), 300);
            }
        });