'use strict';
/* ═══════════════════════════════════════════════════════════
   NextUp Workout Tracker — v5.0
   Redirect-based Google OAuth (works on iPhone Safari)
   ═══════════════════════════════════════════════════════════ */

// ─── Google G Logo SVG ────────────────────────────────────
const G_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" style="flex-shrink:0"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>';

// ─── Translations ─────────────────────────────────────────
const TR = {
  en: {
    appName:'NextUp', recentSessions:'Recent Sessions', workouts:'Workouts',
    start:'▶  Start', edit:'✏️', addWorkout:'+ Add Workout',
    exercises:'exercises', exercise:'Exercise',
    sets:'Sets', reps:'Reps', weight:'Weight', weightKg:'Weight',
    restSec:'Rest (sec)', notes:'Notes / Form Tips',
    exerciseName:'Exercise Name', newExercise:'New Exercise',
    editExercise:'Edit Exercise', save:'Save', cancel:'Cancel',
    delete:'Delete', addExercise:'+ Add Exercise',
    workoutDone:'Workout Done!', backToHome:'Back to Home',
    exit:'Exit', complete:'Complete', startSet:'Start',
    restLabel:'Rest', skipRest:'Skip Rest →', restUnit:'sec',
    exitWorkout:'Exit workout?', areYouSure:'Are you sure?',
    typeDeletePrompt:'Type DELETE to confirm removing this workout.',
    typeDeletePlaceholder:'DELETE', typeDeleteMatch:'DELETE',
    deleteWorkout:'Delete Workout', deleteExercise:'Delete Exercise',
    deleteHint:'This cannot be undone.',
    newWorkout:'New Workout', name:'Name', icon:'Icon', create:'Create',
    importExport:'Import / Export',
    downloadTemplate:'⬇  Download Template',
    uploadFile:'⬆  Upload Excel / CSV',
    importNote:'Download the template, fill it in Excel or Google Sheets, then upload.',
    importSuccess:'Workouts imported!',
    imageOptional:'Image (optional)', tapToUpload:'📸 Tap to upload image',
    imageHint:'Shown during workout & rest', removeImage:'Remove Image',
    set:'Set', back:'←', skipExercise:'Skip this exercise',
    closeInstructions:'Press your home button to exit.',
    next:'Next', confirmDelete:'Confirm', language:'עב',
    weightUnit:'kg',
    yourProfile:'Your Profile', ageLbl:'Age (years)', nameLbl:'Display Name',
    bmiLbl:'BMI', saveProfile:'Save Profile',
    bmiUnder:'Underweight', bmiNormal:'Normal weight',
    bmiOver:'Overweight', bmiObese:'Obese',
    signInGoogle:'Sign in with Google', signOut:'Sign Out',
    googleNotConfigured:'Google Sign-In not configured.\nAdd Client ID to js/config.js',
    setupProfile:'Set up profile',
    metric:'Metric', imperial:'Imperial', units:'Units',
    heightLbl:'Height', weightLbl:'Weight',
    heightUnit_m:'cm', heightUnit_i:'ft / in',
    weightUnit_m:'kg', weightUnit_i:'lbs',
    errAge:'Age must be between 1 and 120',
    editGroup:'Edit Group',
    tenSecsLeft:'10 seconds left',
    countThree:'Three',countTwo:'Two',countOne:'One',goNow:'Go!',
    muteOn:'🔇',muteOff:'🔊',
    errHeightM:'Height must be 50–272 cm',
    errHeightI:'Height must be 1\'8\" – 8\'11\"',
    errWeightM:'Weight must be 20–400 kg',
    errWeightI:'Weight must be 44–880 lbs',
  },
  he: {
    appName:'NextUp', recentSessions:'אימונים אחרונים', workouts:'אימונים',
    start:'▶  התחל', edit:'✏️', addWorkout:'+ הוסף אימון',
    exercises:'תרגילים', exercise:'תרגיל',
    sets:'סטים', reps:'חזרות', weight:'משקל', weightKg:'משקל',
    restSec:'מנוחה (שניות)', notes:'הערות / טיפים',
    exerciseName:'שם תרגיל', newExercise:'תרגיל חדש',
    editExercise:'עריכת תרגיל', save:'שמור', cancel:'ביטול',
    delete:'מחק', addExercise:'+ הוסף תרגיל',
    workoutDone:'אימון הושלם!', backToHome:'חזרה לבית',
    exit:'יציאה', complete:'סיים', startSet:'התחל',
    restLabel:'מנוחה', skipRest:'דלג ←', restUnit:'שניות',
    exitWorkout:'לצאת מהאימון?', areYouSure:'האם אתה בטוח?',
    typeDeletePrompt:'הקלד מחק כדי למחוק אימון זה.',
    typeDeletePlaceholder:'מחק', typeDeleteMatch:'מחק',
    deleteWorkout:'מחיקת אימון', deleteExercise:'מחיקת תרגיל',
    deleteHint:'לא ניתן לבטל פעולה זו.',
    newWorkout:'אימון חדש', name:'שם', icon:'אייקון', create:'צור',
    importExport:'ייבוא / ייצוא',
    downloadTemplate:'⬇  הורד תבנית',
    uploadFile:'⬆  העלה Excel / CSV',
    importNote:'הורד תבנית, מלא אותה ב-Excel, ואז העלה.',
    importSuccess:'האימון יובא בהצלחה!',
    imageOptional:'תמונה (אופציונלי)', tapToUpload:'📸 לחץ להעלאת תמונה',
    imageHint:'תוצג בזמן האימון', removeImage:'הסר תמונה',
    set:'סט', back:'→', skipExercise:'דלג על תרגיל זה',
    closeInstructions:'לחץ על כפתור הבית ליציאה.',
    next:'הבא', confirmDelete:'אשר', language:'EN',
    weightUnit:'ק"ג',
    yourProfile:'הפרופיל שלי', ageLbl:'גיל (שנים)', nameLbl:'שם תצוגה',
    bmiLbl:'BMI', saveProfile:'שמור פרופיל',
    bmiUnder:'תת משקל', bmiNormal:'משקל תקין',
    bmiOver:'עודף משקל', bmiObese:'השמנה',
    signInGoogle:'כניסה עם Google', signOut:'יציאה',
    googleNotConfigured:'Google Sign-In לא מוגדר.\nהוסף Client ID לקובץ js/config.js',
    setupProfile:'הגדר פרופיל',
    metric:'מטרי', imperial:'אימפריאלי', units:'יחידות',
    heightLbl:'גובה', weightLbl:'משקל',
    heightUnit_m:'ס"מ', heightUnit_i:'ft / in',
    weightUnit_m:'ק"ג', weightUnit_i:'לב\'',
    errAge:'גיל חייב להיות בין 1 ל-120',
    editGroup:'עריכת קבוצה',
    tenSecsLeft:'10 שניות נשארו',
    countThree:'שלוש',countTwo:'שתיים',countOne:'אחת',goNow:'קדימה!',
    muteOn:'🔇',muteOff:'🔊',
    errHeightM:'גובה חייב להיות 50–272 ס"מ',
    errHeightI:'גובה חייב להיות בין 1\'8" ל-8\'11"',
    errWeightM:'משקל חייב להיות 20–400 ק"ג',
    errWeightI:'משקל חייב להיות 44–880 ליברות',
  }
};
let lang = localStorage.getItem('gem_lang') || 'en';
const t    = k => (TR[lang]&&TR[lang][k]!==undefined)?TR[lang][k]:(TR.en[k]||k);
const isRTL = () => lang==='he';
function setLanguage(nl){lang=nl;localStorage.setItem('gem_lang',lang);document.documentElement.dir=isRTL()?'rtl':'ltr';document.documentElement.lang=lang;render();}

// ─── Units ────────────────────────────────────────────────
function getUnits(){ return localStorage.getItem('nu_units')||'metric'; }
function cmToFtIn(cm){ const i=cm/2.54; return {ft:Math.floor(i/12),inches:Math.round((i%12)*10)/10}; }
function ftInToCm(ft,i){ return Math.round((ft*12+i)*2.54*10)/10; }
function kgToLbs(kg){ return Math.round(kg*2.2046*10)/10; }
function lbsToKg(lbs){ return Math.round(lbs/2.2046*100)/100; }

// ─── Validation ───────────────────────────────────────────
function valAge(v){if(!v&&v!==0)return null;const n=parseInt(v);return(n>=1&&n<=120)?null:t('errAge');}
function valHeightM(v){if(!v&&v!==0)return null;const n=parseFloat(v);return(n>=50&&n<=272)?null:t('errHeightM');}
function valHeightI(ft,i){if(!ft&&!i)return null;const ti=( parseInt(ft)||0)*12+(parseFloat(i)||0);return(ti>=20&&ti<=107&&(parseFloat(i)||0)<12)?null:t('errHeightI');}
function valWeightM(v){if(!v&&v!==0)return null;const n=parseFloat(v);return(n>=20&&n<=400)?null:t('errWeightM');}
function valWeightI(v){if(!v&&v!==0)return null;const n=parseFloat(v);return(n>=44&&n<=880)?null:t('errWeightI');}

// ─── Google OAuth — Redirect flow (works on all browsers incl. iOS Safari) ──
let currentUser = null;

function signInWithGoogle(){
  if(typeof GOOGLE_CLIENT_ID==='undefined'||!GOOGLE_CLIENT_ID){alert(t('googleNotConfigured'));return;}
  const redir = window.location.origin+window.location.pathname;
  const p = new URLSearchParams({client_id:GOOGLE_CLIENT_ID,redirect_uri:redir,response_type:'token',scope:'openid email profile https://www.googleapis.com/auth/drive.appdata',prompt:'select_account'});
  window.location.href='https://accounts.google.com/o/oauth2/v2/auth?'+p;
}

async function handleOAuthCallback(){
  const hash=window.location.hash;
  if(!hash||!hash.includes('access_token'))return false;
  const p=new URLSearchParams(hash.slice(1));
  const token=p.get('access_token');
  if(!token)return false;
  history.replaceState(null,'',window.location.pathname+window.location.search);
  try{
    const r=await fetch('https://www.googleapis.com/oauth2/v3/userinfo?access_token='+token);
    const d=await r.json();
    if(d.error){console.error(d.error);return false;}
    currentUser={id:d.sub,name:d.name||'',email:d.email||'',picture:d.picture||'',provider:'google'};
    localStorage.setItem('nu_current_user',JSON.stringify(currentUser));
    storeToken(token); // save for Drive sync
    return true;
  }catch(e){console.error('OAuth error',e);return false;}
}

function signOut(){
  currentUser=null; _token=null; _driveFileId=null;
  localStorage.removeItem('nu_current_user');
  localStorage.removeItem('nu_tok');
  loadData();render();
}


// ─── Google Drive Sync ────────────────────────────────────
// Saves/loads all workout data to a hidden app-only file in
// the user's Google Drive — syncs seamlessly across devices.
let _token = null, _driveFileId = null, _syncDebounce = null;
let _syncStatus = 'idle'; // idle | syncing | ok | error

const DRIVE_FILENAME = 'nextup-workouts.json';

function storeToken(t){
  _token = t;
  try{ localStorage.setItem('nu_tok', JSON.stringify({t, exp: Date.now()+55*60*1000})); }catch(e){}
}
function getToken(){
  if(_token) return _token;
  try{
    const s = localStorage.getItem('nu_tok');
    if(!s) return null;
    const {t, exp} = JSON.parse(s);
    if(Date.now() > exp){ localStorage.removeItem('nu_tok'); return null; }
    _token = t; return t;
  }catch(e){ return null; }
}

function _setSyncStatus(s){
  _syncStatus = s;
  const el = document.getElementById('sync-ind');
  if(!el) return;
  const map = {idle:'☁', syncing:'🔄', ok:'✅', error:'⚠️'};
  el.textContent = map[s] || '';
  el.title = s==='ok'?'Synced to Google Drive':
             s==='syncing'?'Syncing...':
             s==='error'?'Sync failed — check Drive API is enabled':'';
}

async function loadFromDrive(){
  const tok = getToken();
  if(!tok || !currentUser) return;
  _setSyncStatus('syncing');
  try{
    // 1. Find file in appDataFolder
    const sr = await fetch(
      "https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&q=name='"+DRIVE_FILENAME+"'&fields=files(id)",
      {headers:{Authorization:'Bearer '+tok}}
    );
    if(!sr.ok) throw new Error(sr.status);
    const sd = await sr.json();

    if(!sd.files || !sd.files.length){
      // No file yet — push current local data up
      _setSyncStatus('ok');
      saveToDrive();
      return;
    }
    _driveFileId = sd.files[0].id;

    // 2. Read file content
    const fr = await fetch(
      "https://www.googleapis.com/drive/v3/files/"+_driveFileId+"?alt=media",
      {headers:{Authorization:'Bearer '+tok}}
    );
    if(!fr.ok) throw new Error(fr.status);
    const data = await fr.json();

    // 3. Apply Drive data → overrides local
    if(data.workouts && data.workouts.length){
      localStorage.setItem(sk('workouts'), JSON.stringify(data.workouts));
      S.workouts = data.workouts;
    }
    if(data.history){
      localStorage.setItem(sk('history'), JSON.stringify(data.history));
      S.history = data.history;
    }
    if(data.profile) localStorage.setItem(sk('profile'), JSON.stringify(data.profile));

    _setSyncStatus('ok');
    render(); // re-render with synced data
  }catch(e){
    console.error('Drive load:', e);
    _setSyncStatus('error');
  }
}

function saveToDrive(){
  const tok = getToken();
  if(!tok || !currentUser) return;
  // Debounce — wait 2.5 s after last change before uploading
  clearTimeout(_syncDebounce);
  _syncDebounce = setTimeout(async ()=>{
    _setSyncStatus('syncing');
    const payload = JSON.stringify({
      workouts: S.workouts, history: S.history,
      profile: getProfile(), savedAt: new Date().toISOString()
    });
    try{
      if(_driveFileId){
        // Update existing file
        const r = await fetch(
          "https://www.googleapis.com/upload/drive/v3/files/"+_driveFileId+"?uploadType=media",
          {method:'PATCH',headers:{Authorization:'Bearer '+tok,'Content-Type':'application/json'},body:payload}
        );
        if(!r.ok) throw new Error(r.status);
      } else {
        // Create new file in appDataFolder
        const b = 'nu_'+Date.now();
        const meta = JSON.stringify({name:DRIVE_FILENAME,parents:['appDataFolder']});
        const body = '--'+b+'\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n'+
          meta+'\r\n--'+b+'\r\nContent-Type: application/json\r\n\r\n'+
          payload+'\r\n--'+b+'--';
        const r = await fetch(
          'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id',
          {method:'POST',headers:{Authorization:'Bearer '+tok,'Content-Type':'multipart/related; boundary='+b},body}
        );
        if(!r.ok) throw new Error(r.status);
        _driveFileId = (await r.json()).id;
      }
      _setSyncStatus('ok');
    }catch(e){
      console.error('Drive save:', e);
      _setSyncStatus('error');
    }
  }, 2500);
}

// ─── State ────────────────────────────────────────────────
const S={screen:'home',workouts:[],history:[],
  session:{workoutIdx:null,exerciseIdx:0,setNum:1},
  rest:{total:0,remaining:0,timer:null,onDone:null},
  edit:{workoutIdx:null,exerciseIdx:null,temp:null},
  modal:{type:null,data:null}};

// ─── Storage (namespaced per user) ────────────────────────
function sk(k){return 'nu_'+(currentUser?currentUser.id:'guest')+'_'+k;}
function loadData(){const w=localStorage.getItem(sk('workouts'));S.workouts=w?JSON.parse(w):JSON.parse(JSON.stringify(DEFAULT_WORKOUTS));const h=localStorage.getItem(sk('history'));S.history=h?JSON.parse(h):[];}
function saveWorkouts(){localStorage.setItem(sk('workouts'),JSON.stringify(S.workouts));saveToDrive();}
function saveHistory() {localStorage.setItem(sk('history'), JSON.stringify(S.history));}
function getImg(wk,id){return localStorage.getItem(sk('img_'+wk+'_'+id));}
function setImg(wk,id,d){localStorage.setItem(sk('img_'+wk+'_'+id),d);}
function delImg(wk,id){localStorage.removeItem(sk('img_'+wk+'_'+id));}

// ─── Profile ───────────────────────────────────────────────
function getProfile(){const s=localStorage.getItem(sk('profile'));const d={name:currentUser?currentUser.name:'',age:'',height:'',weight:''};return s?Object.assign(d,JSON.parse(s)):d;}
function saveProfile(p){localStorage.setItem(sk('profile'),JSON.stringify(p));}
function calcBMI(w,h){if(!w||!h||h<=0)return null;return(parseFloat(w)/Math.pow(parseFloat(h)/100,2)).toFixed(1);}
function bmiCat(b){if(!b)return null;const v=parseFloat(b);if(v<18.5)return{label:t('bmiUnder'),color:'#3498db'};if(v<25)return{label:t('bmiNormal'),color:'#2ecc71'};if(v<30)return{label:t('bmiOver'),color:'#f39c12'};return{label:t('bmiObese'),color:'#FF4A1C'};}
function profileSubtitle(){const p=getProfile();const parts=[];if(p.name)parts.push(p.name);const b=calcBMI(p.weight,p.height);if(b){const c=bmiCat(b);parts.push('BMI '+b+' · '+c.label);}return parts.join(' · ');}


// ─── Speech Synthesis ─────────────────────────────────────
function _speak(text){
  if(localStorage.getItem('nu_mute')==='1') return;
  if(!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(text);
  u.lang=lang==='he'?'he-IL':'en-US';
  u.rate=1.05; u.volume=1;
  window.speechSynthesis.speak(u);
}
function _muted(){ return localStorage.getItem('nu_mute')==='1'; }
function _toggleMute(){
  const m=_muted();
  localStorage.setItem('nu_mute',m?'0':'1');
  // update button if on rest screen
  const btn=document.getElementById('mute-btn');
  if(btn) btn.textContent=m?t('muteOff'):t('muteOn');
}

// ─── Utils ────────────────────────────────────────────────
const $id=$=>document.getElementById($);
const $app=()=>$id('app');
function fmtTime(s){return s>=60?Math.floor(s/60)+':'+String(s%60).padStart(2,'0'):String(s);}
function nextId(a){return a.reduce((m,e)=>Math.max(m,e.id),0)+1;}
function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function go(s){stopRest();S.screen=s;render();}

// ═══════════════════════════════════════════════════════════
// RENDER ROUTER
// ═══════════════════════════════════════════════════════════
function render(){
  switch(S.screen){
    case 'home':         renderHome();         break;
    case 'edit':         renderEdit();         break;
    case 'editExercise': renderEditExercise(); break;
    case 'workout':      renderWorkout();      break;
    case 'rest':         renderRest();         break;
    case 'finish':       renderFinish();       break;
  }
  renderModal();
}

// ═══════════════════════════════════════════════════════════
// HOME
// ═══════════════════════════════════════════════════════════
function renderHome(){
  const sub=profileSubtitle();
  const chips=S.history.slice(0,7).map(h=>{const w=S.workouts.find(wk=>wk.key===h.key);return'<div class="chip">'+(w?w.icon:'💪')+' '+h.date+'</div>';}).join('');
  const avatar=currentUser&&currentUser.picture
    ?'<button class="avatar-btn" data-a="openModal" data-type="profile"><img class="user-avatar-sm" src="'+esc(currentUser.picture)+'" onerror="this.parentElement.innerHTML=\'<div class=&quot;avatar-placeholder&quot; data-a=&quot;openModal&quot; data-type=&quot;profile&quot;>👤</div>\'"></button>'
    :'<div class="avatar-placeholder" data-a="openModal" data-type="profile">👤</div>';
  const cards=S.workouts.map((w,idx)=>'<div class="wcard"><div class="wcard-name">'+esc(w.icon)+' '+esc(w.name)+'</div><div class="wcard-count">'+w.exercises.length+' '+t(w.exercises.length!==1?'exercises':'exercise')+'</div><div class="wcard-btns"><button class="btn btn-primary btn-start" data-a="start" data-idx="'+idx+'">'+t('start')+'</button><button class="btn btn-ghost btn-edit" data-a="editW" data-idx="'+idx+'">'+t('edit')+'</button></div></div>').join('');
  $app().innerHTML='<div class="home-wrap"><div class="home-topbar"><div class="home-logo"><img src="images/icon.png" class="app-icon" alt="" onerror="this.style.display=\'none\'"><div><div class="app-name">'+t('appName')+'</div>'+(sub?'<div class="app-sub">'+esc(sub)+'</div>':'<div class="app-sub" data-a="openModal" data-type="profile" style="cursor:pointer;color:var(--teal);">'+t('setupProfile')+' →</div>')+'</div></div><div class="home-actions">'+avatar+(currentUser?'<span id="sync-ind" class="sync-ind" data-a="syncNow" title="Sync to Drive">☁</span>':'')+
    '<button class="lang-btn" data-a="toggleLang">'+t('language')+'</button><button class="close-btn" data-a="closeApp">✕</button></div></div>'+(S.history.length?'<p class="sec-label">'+t('recentSessions')+'</p><div class="hist-strip">'+chips+'</div>':'')+'<p class="sec-label">'+t('workouts')+'</p>'+cards+'<div style="margin-top:8px;"><button class="btn-add" data-a="openModal" data-type="addWorkout">'+t('addWorkout')+'</button><button class="btn-add btn-import" data-a="openModal" data-type="importExport">⬆⬇ '+t('importExport')+'</button></div></div>';
}

// ═══════════════════════════════════════════════════════════
// EDIT
// ═══════════════════════════════════════════════════════════
function renderEdit(){
  const wi=S.edit.workoutIdx,w=S.workouts[wi];
  const items=w.exercises.map((ex,ei)=>{const img=getImg(w.key,ex.id);return'<div class="exercise-item">'+(img?'<div class="ex-thumb"><img src="'+img+'" alt=""></div>':'<div class="ex-thumb">🏋️</div>')+'<div class="ex-info"><div class="ex-name">'+esc(ex.name)+'</div><div class="ex-meta">'+ex.sets+' × '+esc(ex.reps)+(ex.weight>0?' · '+ex.weight+t('weightUnit'):'')+'</div></div><div class="ex-actions"><button class="btn-icon" data-a="editEx" data-wi="'+wi+'" data-ei="'+ei+'">✏️</button><button class="btn-icon" data-a="delEx" data-wi="'+wi+'" data-ei="'+ei+'">🗑️</button></div></div>';}).join('');
  $app().innerHTML='<div class="screen-header"><button class="btn-back" data-a="home">'+t('back')+'</button>'+
    '<span class="screen-title" style="display:flex;align-items:center;gap:6px;">'+
    '<span>'+esc(w.icon)+' '+esc(w.name)+'</span>'+
    '<button class="btn-icon" style="font-size:15px;padding:0 4px;" data-a="editGroupName" data-wi="'+wi+'">✏️</button>'+
    '</span>'+
    '<button class="btn-danger" data-a="promptDelW" data-wi="'+wi+'">'+t('delete')+'</button></div><div class="edit-wrap">'+items+'<button class="btn-add" data-a="addEx" data-wi="'+wi+'" style="margin-top:8px;">'+t('addExercise')+'</button></div>';
}

// ═══════════════════════════════════════════════════════════
// EDIT EXERCISE
// ═══════════════════════════════════════════════════════════
function renderEditExercise(){
  const wi=S.edit.workoutIdx,ei=S.edit.exerciseIdx,w=S.workouts[wi],ex=S.edit.temp;
  const img=ei!==null?getImg(w.key,ex.id):null;
  $app().innerHTML='<div class="screen-header"><button class="btn-back" data-a="backEdit">'+t('back')+'</button><span class="screen-title">'+t(ei===null?'newExercise':'editExercise')+'</span></div><div class="form-wrap"><div class="form-group"><label class="form-label">'+t('exerciseName')+'</label><input id="f-name" class="form-input" type="text" value="'+esc(ex.name)+'"></div><div class="form-row"><div class="form-group"><label class="form-label">'+t('sets')+'</label><input id="f-sets" class="form-input" type="number" value="'+ex.sets+'" min="1" max="10"></div><div class="form-group"><label class="form-label">'+t('reps')+'</label><input id="f-reps" class="form-input" type="text" value="'+esc(ex.reps)+'"></div><div class="form-group"><label class="form-label">'+t('weightKg')+'</label><input id="f-wgt" class="form-input" type="number" value="'+ex.weight+'" min="0" step="0.5"></div></div><div class="form-group"><label class="form-label">'+t('restSec')+'</label><input id="f-rest" class="form-input" type="number" value="'+ex.rest+'" min="0" step="5"></div><div class="form-group"><label class="form-label">'+t('notes')+'</label><textarea id="f-notes" class="form-input">'+esc(ex.notes||'')+'</textarea></div><div class="form-group"><label class="form-label">'+t('imageOptional')+'</label><div class="img-upload">'+(img?'<img src="'+img+'" alt=""><input type="file" accept="image/*" id="img-input">':'<p>'+t('tapToUpload')+'</p><p class="img-hint">'+t('imageHint')+'</p><input type="file" accept="image/*" id="img-input">')+'</div>'+(img?'<button class="btn-danger" data-a="delImg" data-wi="'+wi+'" data-exid="'+ex.id+'" style="margin-top:8px;width:100%;">'+t('removeImage')+'</button>':'')+'</div><div class="flex-gap mt-16"><button class="btn btn-ghost" data-a="backEdit">'+t('cancel')+'</button><button class="btn btn-primary" data-a="saveEx" data-wi="'+wi+'" data-ei="'+(ei===null?'new':ei)+'">'+t('save')+'</button></div><div style="height:60px;"></div></div>';
  const inp=$id('img-input');
  if(inp)inp.addEventListener('change',function(){
    if(!this.files[0])return;
    showCropper(this.files[0],dataUrl=>{setImg(w.key,ex.id,dataUrl);renderEditExercise();});
  });
}

// ═══════════════════════════════════════════════════════════
// WORKOUT SCREEN
// ═══════════════════════════════════════════════════════════
function renderWorkout(){
  const{workoutIdx:wi,exerciseIdx:ei,setNum}=S.session;
  const w=S.workouts[wi],ex=w.exercises[ei];
  const pct=((ei+setNum/ex.sets)/w.exercises.length*100).toFixed(1);
  const last=setNum===ex.sets;
  const img=getImg(w.key,ex.id);
  $app().innerHTML='<div class="workout-wrap"><div class="progress-row"><span class="progress-lbl">'+t('exercise')+' '+(ei+1)+' / '+w.exercises.length+'</span><span class="exit-lnk" data-a="exitW">⏹ '+t('exit')+'</span></div><div class="progress-track"><div class="progress-fill" style="width:'+pct+'%"></div></div>'+(img?'<img class="ex-image" src="'+img+'" alt="'+esc(ex.name)+'">':'')+'<div class="ex-name-large">'+esc(ex.name)+'</div><div class="ex-group-lbl">'+esc(w.icon)+' '+esc(w.name)+'</div><div class="set-display"><div class="set-label">'+t('set')+'</div><div><span class="set-num">'+setNum+'</span><span class="set-total"> / '+ex.sets+'</span></div></div><div class="stats-grid"><div class="stat-box"><div class="stat-label">'+t('reps')+'</div><div class="stat-value">'+esc(ex.reps)+'</div></div><div class="stat-box"><div class="stat-label">'+t('weight')+'</div><div class="stat-value">'+(ex.weight>0?ex.weight+' '+t('weightUnit'):'BW')+'</div></div></div>'+(ex.notes?'<div class="notes-box">💡 '+esc(ex.notes)+'</div>':'')+'<div class="spacer"></div><button class="btn btn-primary" data-a="doSet">'+(last?t('complete'):t('startSet'))+'</button>'+'<button class="btn btn-skip" data-a="skipEx">'+t('skipExercise')+'</button>'+'</div>';
}

// ═══════════════════════════════════════════════════════════
// REST SCREEN
// ═══════════════════════════════════════════════════════════
function renderRest(){
  const{remaining,total}=S.rest;
  const{workoutIdx:wi,exerciseIdx:ei,setNum}=S.session;
  const w=S.workouts[wi],ex=w.exercises[ei];
  const ns=setNum+1;
  const nextLabel=t('set')+' '+ns+' / '+ex.sets+' — '+esc(ex.name);

  // Ring maths: R=80, viewBox 200×200, centre 100 100
  const R=80,CX=100,CY=100;
  const circ=(2*Math.PI*R);
  // elapsed fraction → how much of the ring has drained away
  const elapsed=total>0?(total-remaining)/total:0;
  const off=(circ*elapsed).toFixed(3);

  const img=getImg(w.key,ex.id);

  $app().innerHTML=
    '<div class="rest-screen">'+
    (img?'<img class="rest-ex-img" src="'+img+'" alt="">':'')+
    '<p class="rest-label">'+t('restLabel')+'</p>'+

    // ── glowing card ──
    '<div class="rest-card">'+

    // SVG ring
    '<div class="rest-ring-wrap">'+
    '<svg width="200" height="200" viewBox="0 0 200 200"'+
    ' style="display:block;filter:drop-shadow(0 0 10px rgba(230,253,30,0.5));">'+
    // track
    '<circle cx="'+CX+'" cy="'+CY+'" r="'+R+'"'+
    ' fill="none" stroke="#333300" stroke-width="7"/>'+
    // arc — rotated so 12 o\'clock is the start point
    '<circle cx="'+CX+'" cy="'+CY+'" r="'+R+'"'+
    ' fill="none" stroke="#E6FD1E" stroke-width="7" stroke-linecap="round"'+
    ' stroke-dasharray="'+circ.toFixed(3)+'"'+
    ' stroke-dashoffset="'+off+'"'+
    ' transform="rotate(-90 '+CX+' '+CY+')"'+
    ' style="transition:stroke-dashoffset 1s linear;"/>'+
    '</svg>'+

    // time overlay — centred inside ring
    '<div class="rest-time-overlay">'+
    '<span class="rest-time-val">'+fmtTime(remaining)+'</span>'+
    '<span class="rest-time-unit">'+t('restUnit')+'</span>'+
    '</div>'+
    '</div>'+ // .rest-ring-wrap

    // next-set label inside the card
    '<p class="rest-next"><strong>'+nextLabel+'</strong></p>'+
    '</div>'+ // .rest-card

    // mute + skip row outside the card
    '<div class="rest-actions-row">'+
    '<button id="mute-btn" class="rest-mute-btn" data-a="toggleMute">'+(_muted()?t('muteOn'):t('muteOff'))+'</button>'+
    '<button class="rest-skip-btn" data-a="skipRest">'+t('skipRest')+'</button>'+
    '</div>'+
    '</div>'; // .rest-screen
}

// ═══════════════════════════════════════════════════════════
// FINISH
// ═══════════════════════════════════════════════════════════
function renderFinish(){
  const w=S.workouts[S.session.workoutIdx];
  const d=new Date().toLocaleDateString(lang==='he'?'he-IL':'en-US',{weekday:'short',month:'short',day:'numeric'});
  $app().innerHTML='<div class="finish-screen"><div class="finish-emoji">🎉</div><h1 class="finish-title">'+t('workoutDone')+'</h1><p class="finish-sub">'+esc(w.icon)+' '+esc(w.name)+' · '+d+'</p><button class="btn btn-primary" data-a="home" style="max-width:280px;">'+t('backToHome')+'</button></div>';
}

// ═══════════════════════════════════════════════════════════
// PROFILE MODAL — with units, validation, redirect Google auth
// ═══════════════════════════════════════════════════════════
function buildProfileModal(){
  const prof=getProfile(), units=getUnits();
  const bmi=calcBMI(prof.weight,prof.height), cat=bmiCat(bmi);

  // Height inputs
  let heightHtml;
  if(units==='imperial'){
    let fv='',iv='';
    if(prof.height){const c=cmToFtIn(prof.height);fv=c.ft;iv=c.inches;}
    heightHtml='<div class="form-row2"><div class="form-group"><label class="form-label">ft</label><input id="p-ft" class="form-input" type="number" value="'+fv+'" min="1" max="8" placeholder="ft"></div><div class="form-group"><label class="form-label">in</label><input id="p-in" class="form-input" type="number" value="'+iv+'" min="0" max="11" step="0.5" placeholder="in"></div></div><span class="form-error" id="err-h"></span>';
  } else {
    heightHtml='<div class="form-group"><input id="p-height" class="form-input" type="number" value="'+(prof.height||'')+'" min="50" max="272" placeholder="cm"><span class="form-error" id="err-h"></span></div>';
  }

  // Weight input
  const dispW=units==='imperial'&&prof.weight?kgToLbs(prof.weight):(prof.weight||'');
  const wPlaceholder=units==='imperial'?'lbs':'kg';
  const wMin=units==='imperial'?44:20, wMax=units==='imperial'?880:400;

  // Google section
  let googleHtml;
  if(currentUser&&currentUser.provider==='google'){
    googleHtml='<div class="user-info-row">'+(currentUser.picture?'<img class="user-pic" src="'+esc(currentUser.picture)+'" onerror="this.style.display=\'none\'">':'')+'<div><div class="user-name">'+esc(currentUser.name)+'</div><div class="user-email">'+esc(currentUser.email)+'</div></div></div><button class="btn btn-ghost" data-a="signOut" style="font-size:13px;padding:10px;margin-bottom:12px;">'+t('signOut')+'</button>';
  } else if(typeof GOOGLE_CLIENT_ID!=='undefined'&&GOOGLE_CLIENT_ID){
    googleHtml='<button class="google-signin-btn" data-a="signInGoogle">'+G_SVG+t('signInGoogle')+'</button>';
  } else {
    googleHtml='<p class="not-config-note">'+t('googleNotConfigured').replace(/\n/g,'<br>')+'</p>';
  }

  return '<div class="modal-title">'+t('yourProfile')+'</div>'+
    googleHtml+
    '<div class="divider"></div>'+
    '<div class="units-row"><span class="units-label">'+t('units')+'</span>'+
    '<div class="units-toggle">'+
    '<button class="unit-btn'+(units==='metric'?' active':'')+'" data-a="setUnits" data-units="metric">'+t('metric')+'</button>'+
    '<button class="unit-btn'+(units==='imperial'?' active':'')+'" data-a="setUnits" data-units="imperial">'+t('imperial')+'</button>'+
    '</div></div>'+
    '<div class="form-group"><label class="form-label">'+t('nameLbl')+'</label><input id="p-name" class="form-input" type="text" value="'+esc(prof.name||'')+'"></div>'+
    '<div class="form-group"><label class="form-label">'+t('ageLbl')+'</label><input id="p-age" class="form-input" type="number" value="'+(prof.age||'')+'" min="1" max="120"><span class="form-error" id="err-age"></span></div>'+
    '<div class="form-group"><label class="form-label">'+t('heightLbl')+' ('+t('heightUnit_'+units.charAt(0))+')</label>'+heightHtml+'</div>'+
    '<div class="form-group"><label class="form-label">'+t('weightLbl')+' ('+t('weightUnit_'+units.charAt(0))+')</label><input id="p-weight" class="form-input" type="number" value="'+dispW+'" min="'+wMin+'" max="'+wMax+'" step="0.5" placeholder="'+wPlaceholder+'"><span class="form-error" id="err-w"></span></div>'+
    '<div id="bmi-display">'+(bmi?'<div class="bmi-box"><div class="bmi-val" style="color:'+cat.color+'">'+bmi+'</div><div class="bmi-cat" style="color:'+cat.color+'">'+cat.label+'</div></div>':'')+'</div>'+
    '<div class="flex-gap mt-12"><button class="btn btn-ghost" data-a="closeModal">'+t('cancel')+'</button><button class="btn btn-primary" data-a="saveProfileBtn">'+t('saveProfile')+'</button></div>';
}

// ═══════════════════════════════════════════════════════════
// MODAL SYSTEM
// ═══════════════════════════════════════════════════════════
function openModal(type,data){S.modal={type,data:data||{}};renderModal();}
function closeModal(){S.modal={type:null,data:null};const m=$id('gem-modal');if(m)m.remove();}

function renderModal(){
  const ex=$id('gem-modal');if(ex)ex.remove();
  if(!S.modal.type)return;
  const ICONS=['💪','🔙','🦵','🔥','🏠','🏋️','🤸','⚡','🎯','🌊','🧘','🏃','🥊','🚴','🧗','🤾'];
  let inner='';

  if(S.modal.type==='addWorkout'){
    const sel=(S.modal.data&&S.modal.data.icon)||'💪';
    inner='<div class="modal-title">'+t('newWorkout')+'</div><div class="form-group"><label class="form-label">'+t('name')+'</label><input id="modal-name" class="form-input" type="text" value="" placeholder="e.g. Arms, HIIT..."></div><div class="form-group"><label class="form-label">'+t('icon')+'</label><div class="icon-grid">'+ICONS.map(ic=>'<button class="icon-btn'+(ic===sel?' selected':'')+'" data-a="selIcon" data-icon="'+ic+'">'+ic+'</button>').join('')+'</div></div><div class="flex-gap mt-12"><button class="btn btn-ghost" data-a="closeModal">'+t('cancel')+'</button><button class="btn btn-primary" data-a="createW">'+t('create')+'</button></div>';
  } else if(S.modal.type==='deleteWorkout'){
    const wi=S.modal.data.wi,wn=S.workouts[wi]?S.workouts[wi].name:'';
    inner='<div class="modal-title">'+t('deleteWorkout')+'</div><p style="color:var(--gray);font-size:13px;text-align:center;margin-bottom:4px;">'+esc(wn)+'</p><p style="color:var(--gray);font-size:12px;text-align:center;margin-bottom:16px;">'+t('deleteHint')+'</p><div class="form-group"><label class="form-label">'+t('typeDeletePrompt')+'</label><input id="del-confirm-input" class="form-input" type="text" placeholder="'+t('typeDeletePlaceholder')+'" autocomplete="off"></div><div class="flex-gap mt-12"><button class="btn btn-ghost" data-a="closeModal">'+t('cancel')+'</button><button class="btn btn-red" id="del-ok-btn" data-a="confirmDelW" data-wi="'+wi+'" style="opacity:.4;cursor:not-allowed;" disabled>'+t('confirmDelete')+'</button></div>';
  } else if(S.modal.type==='importExport'){
    inner='<div class="modal-title">'+t('importExport')+'</div><p style="color:var(--gray);font-size:13px;text-align:center;margin-bottom:20px;">'+t('importNote')+'</p><div style="display:flex;flex-direction:column;gap:12px;"><button class="btn btn-primary" data-a="downloadTemplate">'+t('downloadTemplate')+'</button><div class="upload-area"><p>'+t('uploadFile')+'</p><input type="file" id="import-file" accept=".csv,.xlsx,.xls"></div></div><div class="mt-16"><button class="btn btn-ghost" data-a="closeModal">'+t('cancel')+'</button></div>';
  } else if(S.modal.type==='editGroup'){
    const wi=S.modal.data.wi;
    const sel=(S.modal.data&&S.modal.data.icon)||'💪';
    inner='<div class="modal-title">'+t('editGroup')+'</div>'+
      '<div class="form-group"><label class="form-label">'+t('name')+'</label>'+
      '<input id="modal-name" class="form-input" type="text" value="'+esc(S.modal.data.name||'')+'"></div>'+
      '<div class="form-group"><label class="form-label">'+t('icon')+'</label>'+
      '<div class="icon-grid">'+ICONS.map(ic=>'<button class="icon-btn'+(ic===sel?' selected':'')+'" data-a="selIcon" data-icon="'+ic+'">'+ic+'</button>').join('')+'</div></div>'+
      '<div class="flex-gap mt-12">'+
      '<button class="btn btn-ghost" data-a="closeModal">'+t('cancel')+'</button>'+
      '<button class="btn btn-primary" data-a="saveGroup" data-wi="'+wi+'">'+t('save')+'</button>'+
      '</div>';
  } else if(S.modal.type==='profile'){
    inner=buildProfileModal();
  }

  const m=document.createElement('div');
  m.id='gem-modal';m.className='modal-overlay';
  m.innerHTML='<div class="modal-sheet">'+inner+'</div>';
  document.body.appendChild(m);
  m.addEventListener('click',e=>{if(e.target===m)closeModal();});

  if(S.modal.type==='deleteWorkout'){
    const inp=$id('del-confirm-input'),btn=$id('del-ok-btn');
    if(inp&&btn)inp.addEventListener('input',()=>{const ok=inp.value==='DELETE'||inp.value==='מחק'||inp.value===t('typeDeleteMatch');btn.disabled=!ok;btn.style.opacity=ok?'1':'0.4';btn.style.cursor=ok?'pointer':'not-allowed';});
  }
  if(S.modal.type==='importExport'){const fi=$id('import-file');if(fi)fi.addEventListener('change',handleImport);}
  if(S.modal.type==='profile'){
    ['p-weight','p-height','p-ft','p-in'].forEach(id=>{const el=$id(id);if(el)el.addEventListener('input',updateBmiDisplay);});
  }
}

function updateBmiDisplay(){
  const units=getUnits();let wkg=0,hcm=0;
  if(units==='imperial'){const lbs=parseFloat(($id('p-weight')||{}).value);const ft=parseInt(($id('p-ft')||{}).value)||0;const iin=parseFloat(($id('p-in')||{}).value)||0;wkg=lbs?lbsToKg(lbs):0;hcm=(ft||iin)?ftInToCm(ft,iin):0;}
  else{wkg=parseFloat(($id('p-weight')||{}).value)||0;hcm=parseFloat(($id('p-height')||{}).value)||0;}
  const bmi=calcBMI(wkg,hcm),cat=bmiCat(bmi),box=$id('bmi-display');
  if(!box)return;
  box.innerHTML=bmi?'<div class="bmi-box"><div class="bmi-val" style="color:'+cat.color+'">'+bmi+'</div><div class="bmi-cat" style="color:'+cat.color+'">'+cat.label+'</div></div>':'';
}

function saveProfileHandler(){
  const units=getUnits();
  const name=($id('p-name')||{}).value||'';
  const age=($id('p-age')||{}).value||'';
  let heightCm='',weightKg='',ageErr,hErr,wErr;

  if(units==='imperial'){
    const ft=($id('p-ft')||{}).value||'';const iin=($id('p-in')||{}).value||'';const lbs=($id('p-weight')||{}).value||'';
    ageErr=valAge(age);hErr=valHeightI(ft,iin);wErr=valWeightI(lbs);
    if(!ageErr&&!hErr&&!wErr){if(ft||iin)heightCm=ftInToCm(parseInt(ft)||0,parseFloat(iin)||0);if(lbs)weightKg=lbsToKg(parseFloat(lbs));}
  } else {
    const h=($id('p-height')||{}).value||'';const w=($id('p-weight')||{}).value||'';
    ageErr=valAge(age);hErr=valHeightM(h);wErr=valWeightM(w);
    if(!ageErr&&!hErr&&!wErr){heightCm=h?parseFloat(h):'';weightKg=w?parseFloat(w):'';}
  }

  const ea=$id('err-age'),eh=$id('err-h'),ew=$id('err-w');
  if(ea)ea.textContent=ageErr||'';
  if(eh)eh.textContent=hErr||'';
  if(ew)ew.textContent=wErr||'';
  if(ea&&ageErr)($id('p-age')||{}).classList&&$id('p-age').classList.add('input-error');
  if(eh&&hErr){['p-height','p-ft','p-in'].forEach(id=>{const el=$id(id);if(el)el.classList.add('input-error');});}
  if(ew&&wErr)($id('p-weight')||{}).classList&&$id('p-weight').classList.add('input-error');

  if(ageErr||hErr||wErr)return;
  saveProfile({name,age:age?parseInt(age):'',height:heightCm,weight:weightKg});
  closeModal();render();
}

// ═══════════════════════════════════════════════════════════
// IMPORT / EXPORT — always English headers
// ═══════════════════════════════════════════════════════════
function downloadTemplate(){
  const rows=[['Group','Icon','Exercise Name','Sets','Reps','Weight kg','Rest sec','Notes'],['Push (A)','💪','DB Bench Press',4,'8-10',20,90,'Retract shoulder blades'],['Push (A)','💪','DB Shoulder Press',3,'8-10',12,75,'Seated 90 degrees'],['Pull (B)','🔙','Single-Arm DB Row',4,'8-10',20,90,'Pull elbow to hip'],['Legs','🦵','Bulgarian Split Squat',3,'10/leg',16,75,'3-sec descent']];
  if(typeof XLSX!=='undefined'){const wb=XLSX.utils.book_new();const ws=XLSX.utils.aoa_to_sheet(rows);ws['!cols']=[{wch:16},{wch:6},{wch:26},{wch:6},{wch:8},{wch:10},{wch:10},{wch:40}];XLSX.utils.book_append_sheet(wb,ws,'NextUp');XLSX.writeFile(wb,'nextup_template.xlsx');}
  else{const csv=rows.map(r=>r.map(c=>'"'+String(c).replace(/"/g,'""')+'"').join(',')).join('\n');const a=document.createElement('a');a.href=URL.createObjectURL(new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8'}));a.download='nextup_template.csv';a.click();}
}

function handleImport(e){
  const file=e.target.files[0];if(!file)return;
  const isX=file.name.match(/\.xlsx?$/i);
  const rd=new FileReader();
  rd.onload=function(ev){
    try{
      let rows;
      if(isX&&typeof XLSX!=='undefined'){const wb=XLSX.read(ev.target.result,{type:'array'});rows=XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]],{header:1});}
      else{const txt=typeof ev.target.result==='string'?ev.target.result:new TextDecoder().decode(ev.target.result);rows=parseCSV(txt);}
      if(!rows||rows.length<2){alert('No data found');return;}
      const data=rows.slice(1).filter(r=>r[0]&&r[2]);
      const groups={},order=[];
      data.forEach(r=>{const gn=String(r[0]||'').trim(),gi=String(r[1]||'💪').trim(),n=String(r[2]||'').trim();if(!gn||!n)return;if(!groups[gn]){groups[gn]={name:gn,icon:gi,exercises:[]};order.push(gn);}const gx=groups[gn].exercises;gx.push({id:gx.length+1,name:n,sets:parseInt(r[3])||3,reps:String(r[4]||'10').trim(),weight:parseFloat(r[5])||0,rest:parseInt(r[6])||60,notes:String(r[7]||'').trim()});});
      if(!order.length){alert('No valid rows');return;}
      order.forEach(gn=>{const imp=groups[gn],idx=S.workouts.findIndex(w=>w.name===gn);if(idx>=0){S.workouts[idx].exercises=imp.exercises;S.workouts[idx].icon=imp.icon;}else S.workouts.push({key:'imp_'+Date.now()+'_'+Math.random().toString(36).slice(2),...imp});});
      saveWorkouts();closeModal();go('home');setTimeout(()=>alert(t('importSuccess')),100);
    }catch(err){alert('Error: '+err.message);}
  };
  if(isX&&typeof XLSX!=='undefined')rd.readAsArrayBuffer(file);else rd.readAsText(file);
}

function parseCSV(txt){return txt.split('\n').map(line=>{const r=[];let q=false,c='';for(let i=0;i<line.length;i++){const ch=line[i];if(ch==='"')q=!q;else if(ch===','&&!q){r.push(c.trim());c='';}else c+=ch;}r.push(c.trim());return r;}).filter(r=>r.some(c=>c));}

// ═══════════════════════════════════════════════════════════
// REST TIMER (between sets only)
// ═══════════════════════════════════════════════════════════
function startRest(sec,onDone){
  stopRest();S.rest={total:sec,remaining:sec,timer:null,onDone};S.screen='rest';render();
  S.rest.timer=setInterval(()=>{
    S.rest.remaining--;
    const r=S.rest.remaining;
    // Sound cues
    if(r===10&&S.rest.total>=14) _speak(t('tenSecsLeft'));
    if(r===3) _speak(t('countThree'));
    if(r===2) _speak(t('countTwo'));
    if(r===1) _speak(t('countOne'));
    if(r<=0){
      _speak(t('goNow'));
      const d=S.rest.onDone;S.rest.onDone=null;stopRest();
      if(d)d();else{S.screen='workout';render();}
    }else renderRest();
  },1000);
}
function stopRest(){if(S.rest.timer){clearInterval(S.rest.timer);S.rest.timer=null;}}
function skipRest(){const d=S.rest.onDone;S.rest.onDone=null;stopRest();if(d)d();else{S.screen='workout';render();}}

// ═══════════════════════════════════════════════════════════
// WORKOUT SESSION — no rest between exercises
// ═══════════════════════════════════════════════════════════
function startWorkout(wi){S.session={workoutIdx:wi,exerciseIdx:0,setNum:1};S.screen='workout';render();}

function doSet(){
  const{workoutIdx:wi,exerciseIdx:ei,setNum}=S.session;
  const w=S.workouts[wi],ex=w.exercises[ei];
  const lastSet=setNum===ex.sets,lastEx=ei===w.exercises.length-1;
  if(lastSet){
    if(lastEx){finish();}
    else{S.session.exerciseIdx++;S.session.setNum=1;S.screen='workout';render();}  // No rest between exercises
  } else {
    S.session.setNum++;
    if(ex.rest>0)startRest(ex.rest,()=>{S.screen='workout';render();});else render();
  }
}

function skipEx(){const{workoutIdx:wi,exerciseIdx:ei}=S.session;stopRest();if(ei<S.workouts[wi].exercises.length-1){S.session.exerciseIdx++;S.session.setNum=1;S.screen='workout';render();}else finish();}

function finish(){
  const w=S.workouts[S.session.workoutIdx];
  S.history.unshift({key:w.key,date:new Date().toLocaleDateString(lang==='he'?'he-IL':'en-US',{month:'short',day:'numeric'}),ts:Date.now()});
  if(S.history.length>20)S.history.length=20;
  saveHistory();S.screen='finish';render();
}

// ═══════════════════════════════════════════════════════════
// EVENTS
// ═══════════════════════════════════════════════════════════
document.addEventListener('click',function(e){
  const T=e.target.closest('[data-a]');if(!T)return;const a=T.dataset.a;
  if(a==='home')         {go('home');return;}
  if(a==='toggleLang')   {setLanguage(lang==='en'?'he':'en');return;}
  if(a==='closeApp')     {window.close();setTimeout(()=>alert(t('closeInstructions')),300);return;}
  if(a==='start')        {startWorkout(+T.dataset.idx);return;}
  if(a==='doSet')        {doSet();return;}
  if(a==='skipEx')       {skipEx();return;}
  if(a==='skipRest')     {skipRest();return;}
  if(a==='exitW')        {if(confirm(t('exitWorkout'))){stopRest();go('home');}return;}
  if(a==='signOut')      {signOut();closeModal();return;}
  if(a==='syncNow')      {_driveFileId=null;loadFromDrive();return;}
  if(a==='toggleMute')   {_toggleMute();return;}
  if(a==='editGroupName'){
    const wi=+T.dataset.wi,w=S.workouts[wi];
    openModal('editGroup',{wi,name:w.name,icon:w.icon});return;
  }
  if(a==='saveGroup'){
    const wi=+T.dataset.wi,nm=($id('modal-name')||{}).value||'';
    if(!nm.trim()){alert(t('name')+'?');return;}
    S.workouts[wi].name=nm.trim();
    S.workouts[wi].icon=(S.modal.data&&S.modal.data.icon)||S.workouts[wi].icon;
    saveWorkouts();closeModal();S.edit.workoutIdx=wi;S.screen='edit';render();return;
  }
  if(a==='signInGoogle') {signInWithGoogle();return;}
  if(a==='editW')        {S.edit.workoutIdx=+T.dataset.idx;S.screen='edit';render();return;}
  if(a==='backEdit')     {S.screen='edit';render();return;}
  if(a==='promptDelW')   {openModal('deleteWorkout',{wi:+T.dataset.wi});return;}
  if(a==='confirmDelW')  {if(T.disabled)return;S.workouts.splice(+T.dataset.wi,1);saveWorkouts();closeModal();go('home');return;}
  if(a==='addEx'){const wi=+T.dataset.wi,w=S.workouts[wi];S.edit={workoutIdx:wi,exerciseIdx:null,temp:{id:nextId(w.exercises),name:t('newExercise'),sets:3,reps:'10-12',weight:10,rest:60,notes:''}};S.screen='editExercise';render();return;}
  if(a==='editEx'){const wi=+T.dataset.wi,ei=+T.dataset.ei;S.edit={workoutIdx:wi,exerciseIdx:ei,temp:Object.assign({},S.workouts[wi].exercises[ei])};S.screen='editExercise';render();return;}
  if(a==='delEx'){if(!confirm(t('areYouSure')))return;S.workouts[+T.dataset.wi].exercises.splice(+T.dataset.ei,1);saveWorkouts();render();return;}
  if(a==='saveEx'){const wi=+T.dataset.wi,ei=T.dataset.ei,ex=S.edit.temp;ex.name=($id('f-name')||{}).value||ex.name;ex.sets=parseInt(($id('f-sets')||{}).value)||3;ex.reps=($id('f-reps')||{}).value||ex.reps;ex.weight=parseFloat(($id('f-wgt')||{}).value)||0;ex.rest=parseInt(($id('f-rest')||{}).value)||0;ex.notes=($id('f-notes')||{}).value||'';if(ei==='new')S.workouts[wi].exercises.push(ex);else S.workouts[wi].exercises[+ei]=ex;saveWorkouts();S.screen='edit';render();return;}
  if(a==='delImg'){delImg(S.workouts[+T.dataset.wi].key,+T.dataset.exid);render();return;}
  if(a==='openModal')    {openModal(T.dataset.type,{});return;}
  if(a==='closeModal')   {closeModal();return;}
  if(a==='selIcon')      {if(S.modal.data)S.modal.data.icon=T.dataset.icon;document.querySelectorAll('.icon-btn').forEach(b=>b.classList.toggle('selected',b.dataset.icon===T.dataset.icon));return;}
  if(a==='createW')      {const n=($id('modal-name')||{}).value||'';if(!n.trim()){alert(t('name')+'?');return;}const icon=(S.modal.data&&S.modal.data.icon)||'💪';S.workouts.push({key:'c_'+Date.now(),name:n.trim(),icon,exercises:[]});saveWorkouts();closeModal();go('home');return;}
  if(a==='downloadTemplate'){downloadTemplate();return;}
  if(a==='saveProfileBtn'){saveProfileHandler();return;}
  if(a==='setUnits'){localStorage.setItem('nu_units',T.dataset.units);if(S.modal.type==='profile'){S.modal.type='profile';renderModal();}return;}
});


// ═══════════════════════════════════════════════════════════
// IMAGE CROPPER — square crop with drag-to-reposition
// ═══════════════════════════════════════════════════════════
const CROP_PX = 300;
let _crop = {};

function showCropper(file, onSave) {
  const reader = new FileReader();
  reader.onload = ev => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.max(CROP_PX / img.naturalWidth, CROP_PX / img.naturalHeight);
      _crop = {
        img, scale,
        sw: img.naturalWidth * scale,
        sh: img.naturalHeight * scale,
        ox: (img.naturalWidth * scale - CROP_PX) / 2,
        oy: (img.naturalHeight * scale - CROP_PX) / 2,
        onSave,
      };
      _buildCropper();
    };
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
}

function _buildCropper() {
  const wrap = document.createElement('div');
  wrap.id = 'gem-crop';
  wrap.style.cssText = [
    'position:fixed;inset:0;background:rgba(0,0,0,0.97);z-index:300',
    'display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;padding:24px',
  ].join(';');

  const lbl = document.createElement('p');
  lbl.style.cssText = 'color:#8E8E93;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin:0;';
  lbl.textContent = lang === 'he' ? 'גרור לשינוי מיקום • חיתוך ריבועי' : 'Drag to reposition  •  Square crop';

  const canvas = document.createElement('canvas');
  canvas.width = CROP_PX; canvas.height = CROP_PX;
  canvas.style.cssText = 'border:2px solid #E6FD1E;border-radius:14px;cursor:grab;touch-action:none;' +
    'box-shadow:0 0 24px rgba(230,253,30,0.3);max-width:90vw;max-height:90vw;';
  _drawCrop(canvas);
  _addCropDrag(canvas);

  const row = document.createElement('div');
  row.style.cssText = 'display:flex;gap:10px;width:100%;max-width:' + CROP_PX + 'px;';

  const btnC = document.createElement('button');
  btnC.textContent = lang === 'he' ? 'ביטול' : 'Cancel';
  btnC.style.cssText = 'flex:1;background:transparent;color:#8E8E93;border:1px solid #2B2C30;border-radius:12px;padding:14px;font-size:15px;cursor:pointer;font-family:inherit;';
  btnC.onclick = () => { const el=document.getElementById('gem-crop'); if(el)el.remove(); };

  const btnS = document.createElement('button');
  btnS.textContent = lang === 'he' ? 'חתוך ושמור' : 'Crop & Save';
  btnS.style.cssText = 'flex:1;background:#E6FD1E;color:#121212;border:none;border-radius:12px;padding:14px;font-size:15px;font-weight:700;cursor:pointer;font-family:inherit;';
  btnS.onclick = () => {
    const exp = document.createElement('canvas');
    exp.width = 400; exp.height = 400;
    const ctx = exp.getContext('2d');
    const {img, ox, oy, scale} = _crop;
    const srcX = ox / scale, srcY = oy / scale, srcS = CROP_PX / scale;
    ctx.drawImage(img, srcX, srcY, srcS, srcS, 0, 0, 400, 400);
    if (_crop.onSave) _crop.onSave(exp.toDataURL('image/jpeg', 0.88));
    const el = document.getElementById('gem-crop'); if(el) el.remove();
  };

  row.appendChild(btnC); row.appendChild(btnS);
  wrap.appendChild(lbl); wrap.appendChild(canvas); wrap.appendChild(row);
  document.body.appendChild(wrap);
}

function _drawCrop(canvas) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, CROP_PX, CROP_PX);
  ctx.drawImage(_crop.img, -_crop.ox, -_crop.oy, _crop.sw, _crop.sh);
}

function _addCropDrag(canvas) {
  let drag = false, sx = 0, sy = 0, sox = 0, soy = 0;
  function clamp() {
    _crop.ox = Math.max(0, Math.min(_crop.sw - CROP_PX, _crop.ox));
    _crop.oy = Math.max(0, Math.min(_crop.sh - CROP_PX, _crop.oy));
  }
  // Mouse
  canvas.addEventListener('mousedown', e => {
    drag=true; sx=e.clientX; sy=e.clientY; sox=_crop.ox; soy=_crop.oy;
    canvas.style.cursor='grabbing';
  });
  document.addEventListener('mousemove', e => {
    if(!drag) return;
    _crop.ox = sox-(e.clientX-sx); _crop.oy = soy-(e.clientY-sy);
    clamp(); _drawCrop(canvas);
  });
  document.addEventListener('mouseup', () => { drag=false; canvas.style.cursor='grab'; });
  // Touch
  canvas.addEventListener('touchstart', e => {
    e.preventDefault(); const t=e.touches[0];
    drag=true; sx=t.clientX; sy=t.clientY; sox=_crop.ox; soy=_crop.oy;
  }, {passive:false});
  canvas.addEventListener('touchmove', e => {
    if(!drag) return; e.preventDefault(); const t=e.touches[0];
    _crop.ox = sox-(t.clientX-sx); _crop.oy = soy-(t.clientY-sy);
    clamp(); _drawCrop(canvas);
  }, {passive:false});
  canvas.addEventListener('touchend', () => { drag=false; });
}

// ═══════════════════════════════════════════════════════════
// ASYNC INIT — handles OAuth callback on page load
// ═══════════════════════════════════════════════════════════
async function initApp(){
  document.documentElement.dir=isRTL()?'rtl':'ltr';
  document.documentElement.lang=lang;

  // 1. Handle Google OAuth redirect callback
  const fromGoogle = await handleOAuthCallback();
  if(fromGoogle && currentUser){ loadFromDrive(); }

  // 2. Restore saved user (if not fresh from OAuth)
  if(!currentUser){
    const saved=localStorage.getItem('nu_current_user');
    if(saved){try{currentUser=JSON.parse(saved);}catch(e){}}
  }

  // 3. Load data & initial render
  loadData();
  render();

  // 4. If user is already logged in and has a valid token, sync from Drive
  if(currentUser && getToken()){
    loadFromDrive(); // async — will re-render when done
  }
}

initApp();
