const lessons=[
 {icon:"⚡",tag:"AGES 10–14",title:"Physics in the Real World",desc:"Forces, motion, energy and experiments explained with everyday objects.",when:"Saturday • 10:00 CAT"},
 {icon:"🤖",tag:"AGES 12–18",title:"Build Your First Robot",desc:"Learn sensors, motors, Arduino concepts and how robots interact with the world.",when:"Saturday • 14:00 CAT"},
 {icon:"💻",tag:"ALL AGES",title:"Code Lab",desc:"HTML, CSS and JavaScript through small projects that become real websites.",when:"Wednesday • 18:00 CAT"}
];
const products=[
 {icon:"🔧",tag:"ENGINEERING SUPPLIES",title:"STEM Starter Kit",desc:"A practical electronics and robotics kit for learners.",advertiser:"Advertiser: Example STEM Supplies • Harare",contact:"Contact: +263 77 000 0000"},
 {icon:"💻",tag:"TECHNOLOGY",title:"Student Laptop Deal",desc:"Advertised product slot with transparent company and contact information.",advertiser:"Advertiser: Example Tech Company",contact:"Contact: sales@example.com"},
 {icon:"⚙️",tag:"WORKSHOP",title:"3D Printing Service",desc:"Custom prototype printing for school and engineering projects.",advertiser:"Advertiser: Example Engineering Works",contact:"Contact: +263 78 000 0000"}
];
const progress=[
 {date:"15 AUG 2026",title:"AlfyTech platform concept",text:"Designing a technology community combining engineering progress, learning and alternative advertising."},
 {date:"05 AUG 2026",title:"IRIS v1.0 architecture",text:"Exploring an Intelligent Roadside Information System and planning its software architecture."},
 {date:"03 AUG 2026",title:"AlfyTech identity",text:"Starting the public journey of AlfyTech as an emerging engineering and technology brand."}
];
function render(){
 document.getElementById("lessonCards").innerHTML=lessons.map(x=>`<article class="card"><div class="icon">${x.icon}</div><span class="tag">${x.tag}</span><h3>${x.title}</h3><p>${x.desc}</p><small><b>${x.when}</b></small></article>`).join("");
 document.getElementById("productCards").innerHTML=products.map(x=>`<article class="card"><div class="icon">${x.icon}</div><span class="tag">${x.tag}</span><h3>${x.title}</h3><p>${x.desc}</p><p><b>${x.advertiser}</b><br>${x.contact}</p><button class="btn small">View advertiser</button></article>`).join("");
 document.getElementById("progressList").innerHTML=progress.map(x=>`<article class="timeline-item"><time>${x.date}</time><div><h3>${x.title}</h3><p>${x.text}</p></div></article>`).join("");
}
function openLogin(role="user"){document.getElementById("authModal").classList.add("show");document.getElementById("authModal").dataset.role=role}
function closeModal(){document.querySelectorAll(".modal").forEach(x=>x.classList.remove("show"))}
document.getElementById("loginBtn").onclick=()=>openLogin();
document.getElementById("menuBtn").onclick=()=>document.getElementById("nav").style.display=document.getElementById("nav").style.display==="flex"?"none":"flex";
document.getElementById("loginForm").onsubmit=e=>{
 e.preventDefault(); const email=document.getElementById("email").value.trim().toLowerCase(), pass=document.getElementById("password").value;
 if(email==="admin@alfytech.local"&&pass==="alfy123") showDashboard("admin","Engineer ALFY");
 else if(email==="user@alfytech.local"&&pass==="user123") showDashboard("user","AlfyTech Member");
 else alert("Demo login only: admin@alfytech.local / alfy123 OR user@alfytech.local / user123");
};
function showDashboard(role,name){
 closeModal(); document.getElementById("dashModal").classList.add("show");
 const admin=role==="admin";
 document.getElementById("dashboard").innerHTML=`
 <span class="eyebrow">${admin?"ADMIN OWNER":"MEMBER"} DASHBOARD</span>
 <h2>Welcome, ${name} 👋</h2>
 <p>${admin?"Manage AlfyTech content, lessons, advertisers, engineering posts and members from one place.":"Your AlfyTech learning and community space."}</p>
 <div class="dash-grid"><div class="dash-stat"><b>${lessons.length}</b><span>Live lessons</span></div><div class="dash-stat"><b>${products.length}</b><span>Advertised products</span></div><div class="dash-stat"><b>${progress.length}</b><span>Engineering posts</span></div></div>
 <div class="dashboard-panel"><h3>Quick actions</h3><div class="dashboard-actions">
 ${admin?'<button onclick="alert(\\'Lesson editor ready — connect your database/video provider for production.\\')">＋ Create lesson</button><button onclick="alert(\\'Advertiser form ready for database integration.\\')">＋ Add advertiser</button><button onclick="alert(\\'Engineering post editor ready.\\')">＋ Post progress</button><button onclick="alert(\\'Member management ready for backend integration.\\')">👥 Manage members</button>':'<button onclick="location.hash=\\'learn\\';closeModal()">🎓 Browse lessons</button><button onclick="location.hash=\\'market\\';closeModal()">🛍 Explore products</button><button onclick="location.hash=\\'engineering\\';closeModal()">⚙ Engineering journal</button>'}
 </div></div>
 <div class="dashboard-panel"><h3>${admin?"Admin controls":"Your profile"}</h3><p>${admin?"Content moderation • lesson scheduling • advertiser approval • analytics • member management • announcements":"Progress tracking • saved lessons • badges • discussions • profile settings"}</p></div>`;
}
render();
window.onclick=e=>{if(e.target.classList.contains("modal"))closeModal()};
