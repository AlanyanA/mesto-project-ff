(()=>{"use strict";function e(e,t,n,r,o){var c=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0),a=c.querySelector(".card__delete-button"),i=c.querySelector(".card__like-button"),u=c.querySelector(".card__image"),l=c.querySelector(".card__title"),s=c.querySelector(".card__likes-counter");return u.alt=e.name,u.src=e.link,l.textContent=e.name,s.textContent=e.likes.length,e.owner._id!==o?a.style.display="none":a.addEventListener("click",(function(){return t(e._id,c)})),e.likes.some((function(e){return e._id===o}))&&i.classList.add("card__like-button_is-active"),i.addEventListener("click",(function(){return n(e._id,i,s)})),u.addEventListener("click",(function(){return r(e)})),c}function t(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",r),document.addEventListener("click",o)}function n(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",r),document.removeEventListener("click",o)}function r(e){"Escape"===e.key&&n(document.querySelector(".popup_is-opened"))}function o(e){e.target.classList.contains("popup")&&n(e.target)}function c(e,t,n){t.classList.remove(n.inputErrorClass);var r=e.querySelector(".".concat(t.id,"-error"));r&&(r.textContent="",r.style.opacity="0")}function a(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){c(e,n,t)})),u(n,r,t)}function i(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?c(e,t,n):function(e,t,n,r){t.classList.add(r.inputErrorClass);var o=e.querySelector(".".concat(t.id,"-error"));o&&(o.textContent=n,o.style.opacity="1")}(e,t,t.validationMessage,n)}function u(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):function(e,t){e.disabled=!0,e.classList.add(t.inactiveButtonClass)}(t,n)}var l={baseUrl:"https://nomoreparties.co/v1/wff-cohort-33",headers:{authorization:"dca0ee74-c4e1-43aa-933f-44fe5f6e7d77","Content-Type":"application/json"}},s=function(e){if(!e.ok)throw new Error("Ошибка: ".concat(e.status));return e.json()};function d(e,t){if(e){if("string"==typeof e)return f(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var p=document.forms["edit-profile"],m=document.querySelector(".profile__description"),y=document.querySelector(".popup_type_edit"),_=p.querySelector(".popup__input_type_name"),v=p.querySelector(".popup__input_type_description"),h=document.querySelector(".profile__title"),S=document.querySelector(".profile__image-container"),b=document.querySelector(".popup_type_new-card"),E=document.querySelectorAll(".popup"),q=document.querySelector(".popup_type_image"),g=document.querySelector(".popup_type_profile-avatar"),L=document.forms["new-avatar"],k=document.querySelector(".profile__image"),C=q.querySelector(".popup__caption"),A=document.forms["new-place"],w=q.querySelector(".popup__image"),x=document.querySelector(".places__list");Promise.all([fetch("".concat(l.baseUrl,"/users/me"),{headers:l.headers}).then(s),fetch("".concat(l.baseUrl,"/cards"),{headers:l.headers}).then(s)]).then((function(t){var n,r,o=(r=2,function(e){if(Array.isArray(e))return e}(n=t)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(n,r)||d(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=o[0],a=o[1];T=c._id,function(e){h.textContent=e.name,m.textContent=e.about,k.style.backgroundImage="url(".concat(e.avatar,")")}(c),function(t,n){var r=document.querySelector(".places__list"),o=t.map((function(t){return e(t,B,O,D,n)}));r.replaceChildren.apply(r,function(e){return function(e){if(Array.isArray(e))return f(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||d(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}(o))}(a,T)})).catch((function(e){console.error("Ошибка при загрузке данных:",e)}));var T,U={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button-disabled",inputErrorClass:"popup__input_type_error"};function j(e,t,n){var r=e.textContent;return e.textContent=t,function(){e.textContent=r,n&&n()}}function B(e,t){(function(e){return fetch("".concat(l.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:l.headers}).then(s)})(e).then((function(){t.remove()})).catch((function(e){console.error("Ошибка при удалении карточки:",e)}))}function D(e){w.src=e.link,w.alt=e.name,C.textContent=e.name,t(q)}function I(e){e.target.classList.contains("popup__close")&&n(e.target.closest(".popup"))}function O(e,t,n){(function(e,t){return fetch("".concat(l.baseUrl,"/cards/likes/").concat(e),{method:t?"DELETE":"PUT",headers:l.headers}).then(s)})(e,t.classList.contains("card__like-button_is-active")).then((function(e){n.textContent=e.likes.length,t.classList.toggle("card__like-button_is-active")})).catch((function(e){console.error("Ошибка при обновлении лайка:",e)}))}!function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);u(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){i(e,o,t),u(n,r,t)})),o.addEventListener("focus",(function(){return i(e,o,t)})),o.addEventListener("blur",(function(){return i(e,o,t)}))}))}(t,e)}))}(U),L.addEventListener("submit",(function(e){e.preventDefault();var t,r=j(L.querySelector(U.submitButtonSelector),"Сохранение..."),o=L.elements.avatar_link.value;(t=o,fetch(t,{method:"HEAD"}).then((function(e){if(!e.ok)throw new Error("Ошибка при проверке ссылки");var t=e.headers.get("Content-Type");return t&&t.startsWith("image")})).catch((function(){return!1}))).then((function(e){if(!e)throw new Error("Ссылка не ведет на изображение");return function(e){return fetch("".concat(l.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:l.headers,body:JSON.stringify({avatar:e})}).then(s)}(o)})).then((function(e){k.style.backgroundImage="url(".concat(e.avatar,")"),n(g),L.reset()})).catch((function(e){console.error("Ошибка при обновлении аватара:",e),alert(e.message)})).finally((function(){r()}))})),S.addEventListener("click",(function(){a(L,U),t(g)})),A.addEventListener("submit",(function(t){t.preventDefault();var r,o,c=j(A.querySelector(".popup__button"),"Сохранение...");(r=A.elements["place-name"].value,o=A.elements.link.value,fetch("".concat(l.baseUrl,"/cards"),{method:"POST",headers:l.headers,body:JSON.stringify({name:r,link:o})}).then(s)).then((function(t){!function(t,n){var r=e(t,B,O,D,n);x.prepend(r)}(t,T),n(b),A.reset()})).catch((function(e){console.error("Ошибка при добавлении карточки:",e)})).finally((function(){c()}))})),document.querySelector(".profile__edit-button").addEventListener("click",(function(){_.value=h.textContent,v.value=m.textContent,a(p,U),t(y)})),document.querySelector(".profile__add-button").addEventListener("click",(function(){a(b,U),t(b)})),E.forEach((function(e){e.querySelector(".popup__close").addEventListener("click",I)})),p.addEventListener("submit",(function(e){e.preventDefault();var t,r,o=j(p.querySelector(".popup__button"),"Сохранение...");(t=_.value,r=v.value,fetch("".concat(l.baseUrl,"/users/me"),{method:"PATCH",headers:l.headers,body:JSON.stringify({name:t,about:r})}).then(s)).then((function(e){e&&(h.textContent=e.name,m.textContent=e.about,n(y))})).catch((function(e){console.error("Ошибка при обновлении профиля:",e)})).finally((function(){o()}))}))})();