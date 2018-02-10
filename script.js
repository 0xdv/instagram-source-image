// ==UserScript==
// @name         Instagram Image Source and Search
// @namespace    instagram_search
// @version      0.1
// @description  Adds buttons for simple image saving and searching in Instagram
// @author       coffecode, Search icon made by Smashicons from www.flaticon.com, Google icon made by SimpleIcon from www.flaticon.com
// @include      https://*.instagram.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let firstArticles = document.querySelectorAll('article:not(.processed)');
    firstArticles.forEach(article => {
        addButtons(article);
        article.classList.add('processed');
    });

    let observerConfig = { childList: true, attributes:true, subtree: true};

    let observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if(mutation.type === 'attributes' && mutation.attributeName === 'srcset') {
                //console.log(mutation);
                let img = mutation.target;
                let article = img.closest('article:not(.processed)');
                if(article) {
                    addButtons(article, img.srcset);
                    article.classList.add('processed');
                }
            }
        });
    });

    observer.observe(document.body, observerConfig);

    function addButtons(article, srcset) {
        if(!srcset) {
            let img = article.querySelector('img[srcset]');
            if(img) {
                srcset = img.srcset;
            } else {
                return;
            }
        }

        let urls = srcset.split(',');
        let url = urls[urls.length-1].split(' ')[0];
        //console.log(url);

        let menuBar = article.querySelector('._hmd6j._8oo9w'); // xD
        if(!menuBar) {
            //no menu in this article
            return;
        }

        let sourceBtn = document.createElement('a');
        sourceBtn.target = '_blank';
        sourceBtn.title = 'Source';
        sourceBtn.style.width = '24px';
        sourceBtn.style.height = '24px';
        sourceBtn.style.margin = '8px';
        sourceBtn.style.backgroundImage = "url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU2Ljk2NiA1Ni45NjYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU2Ljk2NiA1Ni45NjY7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4Ij4KPHBhdGggZD0iTTU1LjE0Niw1MS44ODdMNDEuNTg4LDM3Ljc4NmMzLjQ4Ni00LjE0NCw1LjM5Ni05LjM1OCw1LjM5Ni0xNC43ODZjMC0xMi42ODItMTAuMzE4LTIzLTIzLTIzcy0yMywxMC4zMTgtMjMsMjMgIHMxMC4zMTgsMjMsMjMsMjNjNC43NjEsMCw5LjI5OC0xLjQzNiwxMy4xNzctNC4xNjJsMTMuNjYxLDE0LjIwOGMwLjU3MSwwLjU5MywxLjMzOSwwLjkyLDIuMTYyLDAuOTIgIGMwLjc3OSwwLDEuNTE4LTAuMjk3LDIuMDc5LTAuODM3QzU2LjI1NSw1NC45ODIsNTYuMjkzLDUzLjA4LDU1LjE0Niw1MS44ODd6IE0yMy45ODQsNmM5LjM3NCwwLDE3LDcuNjI2LDE3LDE3cy03LjYyNiwxNy0xNywxNyAgcy0xNy03LjYyNi0xNy0xN1MxNC42MSw2LDIzLjk4NCw2eiIgZmlsbD0iIzAwMDAwMCIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K)";
        sourceBtn.href = url;

        let googleBtn = document.createElement('a');
        googleBtn.target = '_blank';
        googleBtn.title = 'Google it';
        googleBtn.style.width = '24px';
        googleBtn.style.height = '24px';
        googleBtn.style.margin = '8px';
        googleBtn.href = `https://www.google.com/searchbyimage?image_url=${url}`;
        let b = "url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDkwIDkwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA5MCA5MDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxwYXRoIGlkPSJHb29nbGUiIGQ9Ik03NC40OTksMEg1MC4xNDRjLTYuMzgyLDAtMTQuNDIxLDAuOTQyLTIxLjE1OCw2LjQ5Yy01LjA5LDQuMzc0LTcuNTY2LDEwLjM5Mi03LjU2NiwxNS44MjggICBjMCw5LjIxMSw3LjA5NCwxOC41NDYsMTkuNjI1LDE4LjU0NmMxLjE4MiwwLDIuNDc3LTAuMTIsMy43ODctMC4yMzVjLTAuNTkyLDEuNDEzLTEuMTg5LDIuNTk0LTEuMTg5LDQuNjA1ICAgYzAsMy42NjIsMS44OTMsNS45MDIsMy41NDcsOC4wMjljLTUuMzE0LDAuMzUzLTE1LjI0OSwwLjk0Mi0yMi41ODMsNS40MjhjLTYuOTc1LDQuMTQzLTkuMTA3LDEwLjE2LTkuMTA3LDE0LjQxNCAgIEMxNS40OTksODEuODQ2LDIzLjc3OCw5MCw0MC45MjMsOTBjMjAuMzM2LDAsMzEuMDk4LTExLjIyLDMxLjA5OC0yMi4zM2MwLTguMTQzLTQuNzI5LTEyLjE2NC05LjkzMi0xNi41MzRsLTQuMjU4LTMuMzA1ICAgYy0xLjI5NS0xLjA2NS0zLjA2OC0yLjQ3OS0zLjA2OC01LjA4YzAtMi41OTcsMS43NzMtNC4yNTQsMy4zMDctNS43ODljNC45NjQtMy44OTYsOS45MzMtOC4wMyw5LjkzMy0xNi43NyAgIGMwLTguOTc5LTUuNjgtMTMuNzA0LTguMzk2LTE1Ljk0N2g3LjMzNEw3NC40OTksMHogTTY0LjEwMyw3Mi4yNzljMCw3LjMyMi02LjAzMywxMi43NTMtMTcuMzg1LDEyLjc1MyAgIGMtMTIuNjQ4LDAtMjAuODA5LTYuMDI0LTIwLjgwOS0xNC40MDVjMC04LjM5Myw3LjU2OC0xMS4yMTgsMTAuMTY2LTEyLjE2NGM0Ljk2OS0xLjY1NiwxMS4zNTItMS44OTEsMTIuNDE0LTEuODkxICAgYzEuMTg0LDAsMS43NzUsMCwyLjcyNSwwLjExNUM2MC4yMDIsNjMuMDY0LDY0LjEwMyw2Ni4yNTcsNjQuMTAzLDcyLjI3OXogTTU0LjY0MiwzNC4yNDljLTEuODkzLDEuODg2LTUuMDg4LDMuMzA1LTguMDQ1LDMuMzA1ICAgYy0xMC4xNjQsMC0xNC43NzItMTMuMTEzLTE0Ljc3Mi0yMS4wMjNjMC0zLjA3MiwwLjU5Mi02LjI1OCwyLjU5OC04Ljc0YzEuODkzLTIuMzYyLDUuMjAxLTMuODk5LDguMjc3LTMuODk5ICAgYzkuODEyLDAsMTQuODk5LDEzLjIyOSwxNC44OTksMjEuNzNDNTcuNTk5LDI3Ljc1Miw1Ny4zNTgsMzEuNTI4LDU0LjY0MiwzNC4yNDl6IiBmaWxsPSIjMDAwMDAwIi8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==)";
        googleBtn.style.backgroundImage = b;//`url('data:image/png;base64,${base64}')`;

        menuBar.appendChild(sourceBtn);
        menuBar.appendChild(googleBtn);
    }

})();