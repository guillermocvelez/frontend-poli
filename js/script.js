(function () {
    function getFavorites() {
        try {
            var raw = localStorage.getItem("verant_favorites");
            return raw ? JSON.parse(raw) : [];
        } catch (error) {
            return [];
        }
    }

    function saveFavorites(favorites) {
        localStorage.setItem("verant_favorites", JSON.stringify(favorites));
    }

    function showToast(message, type) {
        var toast = document.createElement("div");
        toast.className = "js-toast" + (type ? " " + type : "");
        toast.textContent = message;
        document.body.appendChild(toast);

        requestAnimationFrame(function () {
            toast.classList.add("visible");
        });

        setTimeout(function () {
            toast.classList.remove("visible");
            setTimeout(function () {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 250);
        }, 2200);
    }

    function setButtonFavoriteState(button, isFavorite) {
        var icon = button.querySelector(".material-symbols-outlined");
        button.classList.toggle("is-favorite", isFavorite);
        button.setAttribute("aria-pressed", String(isFavorite));
        if (icon) {
            icon.style.fontVariationSettings = isFavorite
                ? "'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24"
                : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24";
        }
    }

    function initFavoriteButton() {
        var saveButton = document.querySelector(".btn-save");
        var titleEl = document.querySelector(".detail-hero-content h1");

        if (!saveButton || !titleEl) {
            return;
        }

        var itemId = titleEl.textContent.trim().toLowerCase();
        var favorites = getFavorites();
        var isFavorite = favorites.indexOf(itemId) !== -1;
        setButtonFavoriteState(saveButton, isFavorite);

        saveButton.addEventListener("click", function () {
            var current = getFavorites();
            var index = current.indexOf(itemId);

            if (index === -1) {
                current.push(itemId);
                setButtonFavoriteState(saveButton, true);
                showToast("Servicio agregado a favoritos", "success");
            } else {
                current.splice(index, 1);
                setButtonFavoriteState(saveButton, false);
                showToast("Servicio eliminado de favoritos", "info");
            }

            saveFavorites(current);
        });
    }

    function clearFieldError(field) {
        field.classList.remove("input-error");
        field.removeAttribute("aria-invalid");

        var wrapper = field.closest(".form-group");
        if (!wrapper) {
            return;
        }

        var oldError = wrapper.querySelector(".form-error");
        if (oldError) {
            oldError.remove();
        }
    }

    function setFieldError(field, message) {
        clearFieldError(field);
        field.classList.add("input-error");
        field.setAttribute("aria-invalid", "true");

        var wrapper = field.closest(".form-group");
        if (!wrapper) {
            return;
        }

        var error = document.createElement("p");
        error.className = "form-error";
        error.textContent = message;
        wrapper.appendChild(error);
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function initContactFormValidation() {
        var contactForm = document.querySelector(".contact-form");
        if (!contactForm) {
            return;
        }

        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            var name = contactForm.querySelector("#name");
            var email = contactForm.querySelector("#email");
            var message = contactForm.querySelector("#message");
            var hasErrors = false;

            [name, email, message].forEach(function (field) {
                if (field) {
                    clearFieldError(field);
                }
            });

            if (!name || name.value.trim().length < 2) {
                hasErrors = true;
                if (name) {
                    setFieldError(name, "Ingresa un nombre valido (minimo 2 caracteres).");
                }
            }

            if (!email || !isValidEmail(email.value.trim())) {
                hasErrors = true;
                if (email) {
                    setFieldError(email, "Ingresa un correo valido.");
                }
            }

            if (!message || message.value.trim().length < 10) {
                hasErrors = true;
                if (message) {
                    setFieldError(message, "El mensaje debe tener al menos 10 caracteres.");
                }
            }

            if (hasErrors) {
                showToast("Revisa los campos marcados.", "error");
                return;
            }

            contactForm.reset();
            showToast("Mensaje enviado correctamente.", "success");
        });

        contactForm.addEventListener("input", function (event) {
            var target = event.target;
            if (target && (target.id === "name" || target.id === "email" || target.id === "message")) {
                clearFieldError(target);
            }
        });
    }

    function initNewsletterForms() {
        var forms = document.querySelectorAll(".mobile-newsletter-form, .newsletter-cta-form");
        if (!forms.length) {
            return;
        }

        forms.forEach(function (form) {
            form.addEventListener("submit", function (event) {
                event.preventDefault();
                var emailInput = form.querySelector("input[type='email']");
                if (!emailInput || !isValidEmail(emailInput.value.trim())) {
                    if (emailInput) {
                        emailInput.classList.add("input-error");
                    }
                    showToast("Ingresa un correo valido para suscribirte.", "error");
                    return;
                }

                emailInput.classList.remove("input-error");
                form.reset();
                showToast("Suscripcion exitosa. Gracias por unirte.", "success");
            });

            var emailInput = form.querySelector("input[type='email']");
            if (emailInput) {
                emailInput.addEventListener("input", function () {
                    emailInput.classList.remove("input-error");
                });
            }
        });
    }

    function normalizeCategory(value) {
        return value
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    }

    function initCatalogFilters() {
        var cards = Array.prototype.slice.call(document.querySelectorAll(".catalog-grid .experience-card"));
        var pills = Array.prototype.slice.call(document.querySelectorAll(".filter-pill"));
        var searchInput = document.querySelector(".search-box input");
        var sortSelect = document.querySelector(".filter-select");

        if (!cards.length || !pills.length) {
            return;
        }

        var activeCategory = "todas";

        function parsePrice(card) {
            var priceText = (card.querySelector(".card-price") || {}).textContent || "";
            var numeric = priceText.replace(/[^0-9]/g, "");
            return numeric ? parseInt(numeric, 10) : 0;
        }

        function applyFilters() {
            var searchText = searchInput ? searchInput.value.trim().toLowerCase() : "";

            cards.forEach(function (card) {
                var cardCategory = normalizeCategory(card.getAttribute("data-category") || "todas");
                var title = ((card.querySelector("h3") || {}).textContent || "").toLowerCase();
                var description = ((card.querySelector(".card-description") || {}).textContent || "").toLowerCase();

                var byCategory = activeCategory === "todas" || cardCategory === activeCategory;
                var bySearch = !searchText || title.indexOf(searchText) !== -1 || description.indexOf(searchText) !== -1;

                card.classList.toggle("is-hidden-js", !(byCategory && bySearch));
            });
        }

        pills.forEach(function (pill) {
            pill.addEventListener("click", function () {
                pills.forEach(function (p) { p.classList.remove("active"); });
                pill.classList.add("active");
                activeCategory = normalizeCategory(pill.textContent.trim());
                applyFilters();
            });
        });

        if (searchInput) {
            searchInput.addEventListener("input", applyFilters);
        }

        if (sortSelect) {
            sortSelect.addEventListener("change", function () {
                var value = sortSelect.value.toLowerCase();
                var sorted = cards.slice();

                if (value.indexOf("menor") !== -1) {
                    sorted.sort(function (a, b) { return parsePrice(a) - parsePrice(b); });
                } else if (value.indexOf("populares") !== -1) {
                    sorted.sort(function (a, b) { return parsePrice(a) - parsePrice(b); });
                } else if (value.indexOf("nuevos") !== -1) {
                    sorted.reverse();
                } else {
                    return;
                }

                var grid = document.querySelector(".catalog-grid");
                if (grid) {
                    sorted.forEach(function (card) { grid.appendChild(card); });
                }
                cards = sorted;
                applyFilters();
            });
        }

        applyFilters();
    }

    document.addEventListener("DOMContentLoaded", function () {
        initFavoriteButton();
        initContactFormValidation();
        initNewsletterForms();
        initCatalogFilters();
    });
})();
