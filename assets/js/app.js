// Minimal client-side app for AlfyTech portal
// Demo owner credentials (insecure) — see README
const OWNER_EMAIL = 'owner@alfytech.com'
const OWNER_PASSWORD = 'alfytech123'

async function loadAds(){
  // Load built-in ads and merge with localStorage-created ads
  let builtIn = []
  try{
    const resp = await fetch('/data/ads.json')
    builtIn = await resp.json()
  }catch(e){
    console.warn('Could not load /data/ads.json', e)
  }
  const persisted = JSON.parse(localStorage.getItem('alfytech_ads')||'[]')
  // persisted ads appear first
  return persisted.concat(builtIn)
}

function renderFeatured(selector, ads){
  const container = document.querySelector(selector)
  if(!container) return
  container.innerHTML = ''
  ads.slice(0,6).forEach(ad=>{
    const col = document.createElement('div')
    col.className = 'col-12 col-md-4'
    col.innerHTML = `
      <div class="card">
        <img src="${ad.image||'/assets/img/placeholder.png'}" class="card-img-top" alt="${escapeHtml(ad.title)}">
        <div class="card-body">
          <h5 class="card-title">${escapeHtml(ad.title)}</h5>
          <p class="card-text">${escapeHtml(ad.description||'')}</p>
          ${ad.price?`<p class="fw-bold">${escapeHtml(ad.price)}</p>`:''}
        </div>
      </div>`
    container.appendChild(col)
  })
}

function renderProducts(selector, ads){
  const container = document.querySelector(selector)
  if(!container) return
  container.innerHTML = ''
  ads.forEach(ad=>{
    const col = document.createElement('div')
    col.className = 'col-12 col-md-4'
    col.innerHTML = `
      <div class="card h-100">
        <img src="${ad.image||'/assets/img/placeholder.png'}" class="card-img-top" alt="${escapeHtml(ad.title)}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${escapeHtml(ad.title)}</h5>
          <p class="card-text flex-grow-1">${escapeHtml(ad.description||'')}</p>
          ${ad.price?`<div class="mt-3"><span class="fw-bold">${escapeHtml(ad.price)}</span></div>`:''}
        </div>
      </div>`
    container.appendChild(col)
  })
}

function escapeHtml(s){
  return String(s||'').replace(/[&<>"']/g, function(c){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c]
  })
}

// Owner dashboard helpers
function isOwnerLoggedIn(){
  return localStorage.getItem('alfytech_owner_logged') === '1'
}
function setOwnerLoggedIn(value){
  localStorage.setItem('alfytech_owner_logged', value? '1':'0')
}

async function init(){
  const ads = await loadAds()
  renderFeatured('#featuredList', ads)
  renderProducts('#products', ads)

  // Index page owner login button
  const btn = document.getElementById('ownerLoginBtn')
  if(btn) btn.addEventListener('click', ()=> window.location.href = '/owner.html')

  // Owner page logic
  const ownerLoginForm = document.getElementById('ownerLoginForm')
  if(ownerLoginForm){
    const loginSection = document.getElementById('loginSection')
    const dashboard = document.getElementById('dashboard')
    const ownerAdsContainer = document.getElementById('ownerAds')

    function refreshOwnerAds(){
      const own = JSON.parse(localStorage.getItem('alfytech_ads')||'[]')
      ownerAdsContainer.innerHTML = ''
      own.forEach((ad, idx)=>{
        const col = document.createElement('div')
        col.className = 'col-12 col-md-6'
        col.innerHTML = `
          <div class="card">
            <img src="${ad.image||'/assets/img/placeholder.png'}" class="card-img-top">
            <div class="card-body">
              <h5>${escapeHtml(ad.title)}</h5>
              <p>${escapeHtml(ad.description||'')}</p>
              <p class="fw-bold">${escapeHtml(ad.price||'')}</p>
              <div class="d-flex gap-2">
                <button class="btn btn-sm btn-danger" data-idx="${idx}">Delete</button>
              </div>
            </div>
          </div>`
        ownerAdsContainer.appendChild(col)
      })
      // wire delete buttons
      ownerAdsContainer.querySelectorAll('button[data-idx]').forEach(b=>{
        b.addEventListener('click', ()=>{
          const i = Number(b.getAttribute('data-idx'))
          const a = JSON.parse(localStorage.getItem('alfytech_ads')||'[]')
          a.splice(i,1)
          localStorage.setItem('alfytech_ads', JSON.stringify(a))
          refreshOwnerAds()
          init() // re-render consumer pages
        })
      })
    }

    if(isOwnerLoggedIn()){
      loginSection.style.display = 'none'
      dashboard.style.display = 'block'
      refreshOwnerAds()
    }

    ownerLoginForm.addEventListener('submit', (ev)=>{
      ev.preventDefault()
      const email = document.getElementById('ownerEmail').value
      const pwd = document.getElementById('ownerPassword').value
      if(email === OWNER_EMAIL && pwd === OWNER_PASSWORD){
        setOwnerLoggedIn(true)
        loginSection.style.display = 'none'
        dashboard.style.display = 'block'
        refreshOwnerAds()
      }else{
        alert('Invalid owner credentials')
      }
    })

    const addAdForm = document.getElementById('addAdForm')
    addAdForm && addAdForm.addEventListener('submit', (ev)=>{
      ev.preventDefault()
      const title = document.getElementById('adTitle').value
      const desc = document.getElementById('adDesc').value
      const price = document.getElementById('adPrice').value
      const image = document.getElementById('adImage').value || ''
      const a = JSON.parse(localStorage.getItem('alfytech_ads')||'[]')
      a.unshift({title,description:desc,price,image})
      localStorage.setItem('alfytech_ads', JSON.stringify(a))
      addAdForm.reset()
      refreshOwnerAds()
      init()
    })

    const logoutBtn = document.getElementById('logoutBtn')
    logoutBtn && logoutBtn.addEventListener('click', ()=>{
      setOwnerLoggedIn(false)
      location.reload()
    })
  }
}

// Kick off
window.addEventListener('DOMContentLoaded', init)
