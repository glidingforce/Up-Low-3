'use strict';
/* ═══════════════════════════════════════════════════════════
   NextUp Workout Tracker  v6.0
   Programs · Drive Folder · Image Sync · Smart Lbs
   ═══════════════════════════════════════════════════════════ */

const G_SVG='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" style="flex-shrink:0"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>';

// ─── Translations ─────────────────────────────────────────
const TR={
  en:{
    appName:'NextUp',recentSessions:'Recent Sessions',workouts:'Workouts',
    start:'▶  Start',nextSet:'Next Set',edit:'✏️',addWorkout:'+ Add Workout',
    exercises:'exercises',exercise:'Exercise',
    sets:'Sets',reps:'Reps',weight:'Weight',weightKg:'Weight',
    restSec:'Rest (sec)',notes:'Notes / Form Tips',
    exerciseName:'Exercise Name',newExercise:'New Exercise',
    editExercise:'Edit Exercise',save:'Save',cancel:'Cancel',
    delete:'Delete',addExercise:'+ Add Exercise',
    workoutDone:'Workout Done!',backToHome:'Back to Home',
    exit:'Exit',complete:'Complete',startSet:'Start',
    restLabel:'Rest',skipRest:'Skip Rest →',restUnit:'sec',
    exitWorkout:'Exit workout?',areYouSure:'Are you sure?',
    typeDeletePrompt:'Type DELETE to confirm.',
    typeDeletePlaceholder:'DELETE',typeDeleteMatch:'DELETE',
    deleteWorkout:'Delete Workout',deleteHint:'This cannot be undone.',
    newWorkout:'New Workout',name:'Name',icon:'Icon',create:'Create',
    importExport:'Import / Export',
    downloadTemplate:'⬇  Download Template',uploadFile:'⬆  Upload Excel / CSV',
    importNote:'Download the template, fill it in Excel or Google Sheets, then upload.',
    importSuccess:'Workouts imported!',
    imageOptional:'Image (optional)',tapToUpload:'📸 Tap to upload image',
    imageHint:'Shown during workout & rest',removeImage:'Remove Image',
    set:'Set',back:'←',skipExercise:'Skip this exercise',
    closeInstructions:'Press your home button to exit.',
    confirmDelete:'Confirm',language:'עב',weightUnit:'kg',
    yourProfile:'Your Profile',ageLbl:'Age (years)',nameLbl:'Display Name',
    bmiLbl:'BMI',saveProfile:'Save Profile',
    bmiUnder:'Underweight',bmiNormal:'Normal weight',bmiOver:'Overweight',bmiObese:'Obese',
    signInGoogle:'Sign in with Google',signOut:'Sign Out',
    googleNotConfigured:'Google Sign-In not configured.\nAdd Client ID to js/config.js',
    setupProfile:'Set up profile',
    metric:'Metric',imperial:'Imperial',units:'Units',
    heightLbl:'Height',weightLbl:'Weight',
    heightUnit_m:'cm',heightUnit_i:'ft / in',
    weightUnit_m:'kg',weightUnit_i:'lbs',
    errAge:'Age must be between 1 and 120',
    errHeightM:'Height must be 50–272 cm',
    errHeightI:'Height must be 1\'8\" – 8\'11\"',
    errWeightM:'Weight must be 20–400 kg',
    errWeightI:'Weight must be 44–880 lbs',
    editGroup:'Edit Group',
    tenSecsLeft:'10 seconds left',countThree:'Three',countTwo:'Two',countOne:'One',goNow:'Go!',
    muteOn:'🔇',muteOff:'🔊',
    programs:'Programs',newProgram:'+ New Program',loadProg:'Load',
    activeProg:'Active',progName:'Program name',deleteProgram:'Delete Program',
    openInDrive:'Open in Google Sheets ↗',
    driveNote:'Edit in Google Sheets, then tap Drive → App to sync back.',
    imgNote:'Images stored in NextUp Workouts/Images on Drive.',
  },
  he:{
    appName:'NextUp',recentSessions:'אימונים אחרונים',workouts:'אימונים',
    start:'▶  התחל',nextSet:'סט הבא',edit:'✏️',addWorkout:'+ הוסף אימון',
    exercises:'תרגילים',exercise:'תרגיל',
    sets:'סטים',reps:'חזרות',weight:'משקל',weightKg:'משקל',
    restSec:'מנוחה (שניות)',notes:'הערות / טיפים',
    exerciseName:'שם תרגיל',newExercise:'תרגיל חדש',
    editExercise:'עריכת תרגיל',save:'שמור',cancel:'ביטול',
    delete:'מחק',addExercise:'+ הוסף תרגיל',
    workoutDone:'אימון הושלם!',backToHome:'חזרה לבית',
    exit:'יציאה',complete:'סיים',startSet:'התחל',
    restLabel:'מנוחה',skipRest:'דלג ←',restUnit:'שניות',
    exitWorkout:'לצאת מהאימון?',areYouSure:'האם אתה בטוח?',
    typeDeletePrompt:'הקלד מחק לאישור.',
    typeDeletePlaceholder:'מחק',typeDeleteMatch:'מחק',
    deleteWorkout:'מחיקת אימון',deleteHint:'לא ניתן לבטל.',
    newWorkout:'אימון חדש',name:'שם',icon:'אייקון',create:'צור',
    importExport:'ייבוא / ייצוא',
    downloadTemplate:'⬇  הורד תבנית',uploadFile:'⬆  העלה Excel / CSV',
    importNote:'הורד תבנית, מלא אותה ב-Excel, ואז העלה.',
    importSuccess:'האימון יובא בהצלחה!',
    imageOptional:'תמונה (אופציונלי)',tapToUpload:'📸 לחץ להעלאת תמונה',
    imageHint:'תוצג בזמן האימון',removeImage:'הסר תמונה',
    set:'סט',back:'→',skipExercise:'דלג על תרגיל זה',
    closeInstructions:'לחץ על כפתור הבית ליציאה.',
    confirmDelete:'אשר',language:'EN',weightUnit:'ק"ג',
    yourProfile:'הפרופיל שלי',ageLbl:'גיל (שנים)',nameLbl:'שם תצוגה',
    bmiLbl:'BMI',saveProfile:'שמור פרופיל',
    bmiUnder:'תת משקל',bmiNormal:'משקל תקין',bmiOver:'עודף משקל',bmiObese:'השמנה',
    signInGoogle:'כניסה עם Google',signOut:'יציאה',
    googleNotConfigured:'Google Sign-In לא מוגדר.\nהוסף Client ID לקובץ js/config.js',
    setupProfile:'הגדר פרופיל',
    metric:'מטרי',imperial:'אימפריאלי',units:'יחידות',
    heightLbl:'גובה',weightLbl:'משקל',
    heightUnit_m:'ס"מ',heightUnit_i:'ft / in',
    weightUnit_m:'ק"ג',weightUnit_i:'לב\'',
    errAge:'גיל חייב להיות בין 1 ל-120',
    errHeightM:'גובה חייב להיות 50–272 ס"מ',
    errHeightI:'גובה חייב להיות בין 1\'8" ל-8\'11"',
    errWeightM:'משקל חייב להיות 20–400 ק"ג',
    errWeightI:'משקל חייב להיות 44–880 ליברות',
    editGroup:'עריכת קבוצה',
    tenSecsLeft:'10 שניות נשארו',countThree:'שלוש',countTwo:'שתיים',countOne:'אחת',goNow:'קדימה!',
    muteOn:'🔇',muteOff:'🔊',
    programs:'תוכניות',newProgram:'+ תוכנית חדשה',loadProg:'טען',
    activeProg:'פעילה',progName:'שם תוכנית',deleteProgram:'מחק תוכנית',
    openInDrive:'פתח ב-Google Sheets ↗',
    driveNote:'ערוך ב-Google Sheets, ואז לחץ Drive → אפליקציה לסנכרון.',
    imgNote:'תמונות מאוחסנות ב-NextUp Workouts/Images ב-Drive.',
  }
};
let lang=localStorage.getItem('gem_lang')||'en';
const t=k=>(TR[lang]&&TR[lang][k]!==undefined)?TR[lang][k]:(TR.en[k]||k);
const isRTL=()=>lang==='he';
function setLanguage(nl){lang=nl;localStorage.setItem('gem_lang',lang);document.documentElement.dir=isRTL()?'rtl':'ltr';document.documentElement.lang=lang;render();}

// ─── Units ─────────────────────────────────────────────────
function getUnits(){return localStorage.getItem('nu_units')||'metric';}
function cmToFtIn(cm){const i=cm/2.54;return{ft:Math.floor(i/12),inches:Math.round((i%12)*10)/10};}
function ftInToCm(ft,i){return Math.round((ft*12+i)*2.54*10)/10;}
function lbsToNearestKg(lbs){return Math.round(parseFloat(lbs)/2.2046*2)/2;}

// ─── Smart lbs — nearest real dumbbell weight ───────────────
const COMMON_LBS_DB=[2.5,5,7.5,10,12.5,15,17.5,20,22.5,25,27.5,30,35,40,45,
  50,55,60,65,70,75,80,85,90,95,100,110,120,130,140,150];
function kgToSmartLbs(kg){
  if(!kg) return 0;
  const raw=parseFloat(kg)*2.2046;
  return COMMON_LBS_DB.reduce((b,v)=>Math.abs(v-raw)<Math.abs(b-raw)?v:b);
}

// ─── Validation ─────────────────────────────────────────────
function valAge(v){if(!v&&v!==0)return null;const n=parseInt(v);return(n>=1&&n<=120)?null:t('errAge');}
function valHeightM(v){if(!v&&v!==0)return null;const n=parseFloat(v);return(n>=50&&n<=272)?null:t('errHeightM');}
function valHeightI(ft,i){if(!ft&&!i)return null;const ti=(parseInt(ft)||0)*12+(parseFloat(i)||0);return(ti>=20&&ti<=107&&(parseFloat(i)||0)<12)?null:t('errHeightI');}
function valWeightM(v){if(!v&&v!==0)return null;const n=parseFloat(v);return(n>=20&&n<=400)?null:t('errWeightM');}
function valWeightI(v){if(!v&&v!==0)return null;const n=parseFloat(v);return(n>=44&&n<=880)?null:t('errWeightI');}

// ─── Google OAuth — Redirect flow ──────────────────────────
let currentUser=null;

function signInWithGoogle(){
  if(typeof GOOGLE_CLIENT_ID==='undefined'||!GOOGLE_CLIENT_ID){alert(t('googleNotConfigured'));return;}
  const redir=window.location.origin+window.location.pathname;
  const p=new URLSearchParams({client_id:GOOGLE_CLIENT_ID,redirect_uri:redir,response_type:'token',
    scope:'openid email profile https://www.googleapis.com/auth/drive.file',prompt:'select_account'});
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
    storeToken(token);
    const r=await fetch('https://www.googleapis.com/oauth2/v3/userinfo?access_token='+token);
    const d=await r.json();
    if(d.error){return false;}
    currentUser={id:d.sub,name:d.name||'',email:d.email||'',picture:d.picture||'',provider:'google'};
    localStorage.setItem('nu_current_user',JSON.stringify(currentUser));
    setTimeout(checkDriveOnLogin,400);
    return true;
  }catch(e){console.error('OAuth error',e);return false;}
}

function signOut(){
  currentUser=null;_token=null;_driveFolderId=null;_driveImgFolderId=null;
  localStorage.removeItem('nu_current_user');localStorage.removeItem('nu_tok');
  _loadPrograms();loadData();render();
}

// ─── Token storage ──────────────────────────────────────────
let _token=null;
function storeToken(t){
  _token=t;
  try{localStorage.setItem('nu_tok',JSON.stringify({t,exp:Date.now()+55*60*1000}));}catch(e){}
}
function getToken(){
  if(_token)return _token;
  try{
    const s=localStorage.getItem('nu_tok');if(!s)return null;
    const {t,exp}=JSON.parse(s);
    if(Date.now()>exp){localStorage.removeItem('nu_tok');return null;}
    _token=t;return t;
  }catch(e){return null;}
}

// ─── Programs ───────────────────────────────────────────────
let _programs=[];
let _activeProg='default';

function _loadPrograms(){
  const uid=currentUser?currentUser.id:'guest';
  const s=localStorage.getItem('nu_'+uid+'_progs');
  _programs=s?JSON.parse(s):[{key:'default',name:'Main Program'}];
  _activeProg=localStorage.getItem('nu_'+uid+'_active_prog')||'default';
  if(!_programs.find(p=>p.key===_activeProg))_activeProg=_programs[0].key;
}
function _savePrograms(){
  const uid=currentUser?currentUser.id:'guest';
  localStorage.setItem('nu_'+uid+'_progs',JSON.stringify(_programs));
}
function _getActiveProg(){return _programs.find(p=>p.key===_activeProg)||_programs[0]||{key:'default',name:'Main Program'};}
function _switchProgram(key){
  const uid=currentUser?currentUser.id:'guest';
  _activeProg=key;
  localStorage.setItem('nu_'+uid+'_active_prog',key);
  loadData();render();
}
function _createProgram(name){
  const key='prog_'+Date.now();
  _programs.push({key,name});
  _savePrograms();
  localStorage.setItem(skP('workouts',key),JSON.stringify(JSON.parse(JSON.stringify(DEFAULT_WORKOUTS))));
  _activeProg=key;
  const uid=currentUser?currentUser.id:'guest';
  localStorage.setItem('nu_'+uid+'_active_prog',key);
  loadData();render();
}
function _deleteProgram(key){
  if(_programs.length<=1){alert('Cannot delete the only program.');return;}
  _programs=_programs.filter(p=>p.key!==key);
  _savePrograms();
  if(_activeProg===key){_activeProg=_programs[0].key;const uid=currentUser?currentUser.id:'guest';localStorage.setItem('nu_'+uid+'_active_prog',_activeProg);}
  loadData();render();
}
function _renameProgram(key,name){
  const p=_programs.find(p=>p.key===key);
  if(p){p.name=name;_savePrograms();}
}

// ─── Storage (user + program scoped) ───────────────────────
function sk(key){return 'nu_'+(currentUser?currentUser.id:'guest')+'_'+key;}
function skP(key,progKey){return sk('p_'+(progKey||_activeProg)+'_'+key);}

function loadData(){
  // Try program-scoped first, fallback to legacy key
  let w=localStorage.getItem(skP('workouts'));
  if(!w)w=localStorage.getItem(sk('workouts'));
  S.workouts=w?JSON.parse(w):JSON.parse(JSON.stringify(DEFAULT_WORKOUTS));
  let h=localStorage.getItem(skP('history'));
  if(!h)h=localStorage.getItem(sk('history'));
  S.history=h?JSON.parse(h):[];
}
function saveWorkouts(){localStorage.setItem(skP('workouts'),JSON.stringify(S.workouts));}
function saveHistory(){localStorage.setItem(skP('history'),JSON.stringify(S.history));}
function getImg(wk,id){return localStorage.getItem(sk('img_'+wk+'_'+id));}
function setImg(wk,id,d){localStorage.setItem(sk('img_'+wk+'_'+id),d);}
function delImg(wk,id){localStorage.removeItem(sk('img_'+wk+'_'+id));}

// ─── Profile ────────────────────────────────────────────────
function getProfile(){const s=localStorage.getItem(sk('profile'));const d={name:currentUser?currentUser.name:'',age:'',height:'',weight:''};return s?Object.assign(d,JSON.parse(s)):d;}
function saveProfile(p){localStorage.setItem(sk('profile'),JSON.stringify(p));}
function calcBMI(w,h){if(!w||!h||h<=0)return null;return(parseFloat(w)/Math.pow(parseFloat(h)/100,2)).toFixed(1);}
function bmiCat(b){if(!b)return null;const v=parseFloat(b);if(v<18.5)return{label:t('bmiUnder'),color:'#3498db'};if(v<25)return{label:t('bmiNormal'),color:'#2ecc71'};if(v<30)return{label:t('bmiOver'),color:'#f39c12'};return{label:t('bmiObese'),color:'#FF4A1C'};}
function profileSubtitle(){const p=getProfile();const parts=[];if(p.name)parts.push(p.name);const b=calcBMI(p.weight,p.height);if(b){const c=bmiCat(b);parts.push('BMI '+b+' · '+c.label);}return parts.join(' · ');}

// ─── Drive folder + image sync ──────────────────────────────
const DRIVE_FOLDER_NAME='NextUp Workouts';
let _driveFolderId=null,_driveImgFolderId=null;
let _syncStatus='idle';

function _setSyncStatus(s){
  _syncStatus=s;
  const el=document.getElementById('sync-ind');if(!el)return;
  const map={idle:'☁',syncing:'🔄',ok:'✅',error:'⚠️'};
  el.textContent=map[s]||'';
  el.title=s==='ok'?'Synced':s==='syncing'?'Syncing...':s==='error'?'Sync error':'Tap to sync';
}
function _progDriveFilename(){return (_getActiveProg().name||'Workouts')+'.xlsx';}

async function _ensureFolder(tok,name,parentId){
  const q=parentId?"name='"+name+"' and mimeType='application/vnd.google-apps.folder' and '"+parentId+"' in parents and trashed=false":"name='"+name+"' and mimeType='application/vnd.google-apps.folder' and trashed=false";
  const r=await fetch('https://www.googleapis.com/drive/v3/files?q='+encodeURIComponent(q)+'&fields=files(id)',{headers:{Authorization:'Bearer '+tok}});
  const d=await r.json();
  if(d.files&&d.files.length)return d.files[0].id;
  const meta={name,mimeType:'application/vnd.google-apps.folder'};
  if(parentId)meta.parents=[parentId];
  const cr=await fetch('https://www.googleapis.com/drive/v3/files',{method:'POST',headers:{Authorization:'Bearer '+tok,'Content-Type':'application/json'},body:JSON.stringify(meta)});
  return(await cr.json()).id;
}

async function _ensureFolders(tok){
  if(!_driveFolderId){const c=localStorage.getItem(sk('dfid'));if(c)_driveFolderId=c;else{_driveFolderId=await _ensureFolder(tok,DRIVE_FOLDER_NAME,null);localStorage.setItem(sk('dfid'),_driveFolderId);}}
  if(!_driveImgFolderId){const c=localStorage.getItem(sk('dimgfid'));if(c)_driveImgFolderId=c;else{_driveImgFolderId=await _ensureFolder(tok,'Images',_driveFolderId);localStorage.setItem(sk('dimgfid'),_driveImgFolderId);}}
  return{fid:_driveFolderId,imgFid:_driveImgFolderId};
}

async function _uploadDrive(tok,bytes,existingId,folderId,filename){
  const MIME='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  const blob=new Blob([bytes],{type:MIME});
  if(existingId){
    const r=await fetch('https://www.googleapis.com/upload/drive/v3/files/'+existingId+'?uploadType=media',{method:'PATCH',headers:{Authorization:'Bearer '+tok,'Content-Type':MIME},body:blob});
    if(!r.ok)throw new Error('upload '+r.status);
    return existingId;
  } else {
    const meta={name:filename||_progDriveFilename()};
    if(folderId)meta.parents=[folderId];
    const cr=await fetch('https://www.googleapis.com/drive/v3/files',{method:'POST',headers:{Authorization:'Bearer '+tok,'Content-Type':'application/json'},body:JSON.stringify(meta)});
    if(!cr.ok)throw new Error('create '+cr.status);
    const newId=(await cr.json()).id;
    const r2=await fetch('https://www.googleapis.com/upload/drive/v3/files/'+newId+'?uploadType=media',{method:'PATCH',headers:{Authorization:'Bearer '+tok,'Content-Type':MIME},body:blob});
    if(!r2.ok)throw new Error('upload2 '+r2.status);
    return newId;
  }
}

async function _uploadImgToDrive(tok,imgFid,imgKey,dataUrl){
  try{
    const[hdr,b64]=dataUrl.split(',');
    const mime=hdr.match(/:(.*?);/)[1];
    const bin=atob(b64);const bytes=new Uint8Array(bin.length);
    for(let i=0;i<bin.length;i++)bytes[i]=bin.charCodeAt(i);
    const blob=new Blob([bytes],{type:mime});
    const fname=imgKey+'.jpg';
    const qFind=encodeURIComponent("name='"+fname+"' and '"+imgFid+"' in parents and trashed=false");
    const sr=await fetch('https://www.googleapis.com/drive/v3/files?q='+qFind+'&fields=files(id)',{headers:{Authorization:'Bearer '+tok}});
    const sd=await sr.json();
    if(sd.files&&sd.files.length){
      await fetch('https://www.googleapis.com/upload/drive/v3/files/'+sd.files[0].id+'?uploadType=media',{method:'PATCH',headers:{Authorization:'Bearer '+tok,'Content-Type':mime},body:blob});
    } else {
      const boundary='imgb_'+Date.now();
      const metaStr=JSON.stringify({name:fname,parents:[imgFid]});
      const parts='--'+boundary+'\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n'+metaStr+'\r\n--'+boundary+'\r\nContent-Type: '+mime+'\r\n\r\n';
      const pb=new TextEncoder().encode(parts);const eb=new TextEncoder().encode('\r\n--'+boundary+'--');
      const combined=new Uint8Array(pb.length+bytes.length+eb.length);
      combined.set(pb,0);combined.set(bytes,pb.length);combined.set(eb,pb.length+bytes.length);
      await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',{method:'POST',headers:{Authorization:'Bearer '+tok,'Content-Type':'multipart/related; boundary='+boundary},body:combined});
    }
  }catch(e){console.warn('img upload',imgKey,e);}
}

async function _syncImgsToDrive(tok,imgFid){
  const prefix=sk('img_');
  const keys=Object.keys(localStorage).filter(k=>k.startsWith(prefix));
  for(const k of keys){const d=localStorage.getItem(k);if(d)await _uploadImgToDrive(tok,imgFid,k.replace(prefix,''),d);}
}

async function _syncImgsFromDrive(tok,imgFid){
  try{
    const r=await fetch("https://www.googleapis.com/drive/v3/files?q="+encodeURIComponent("'"+imgFid+"' in parents and trashed=false")+"&fields=files(id,name)",{headers:{Authorization:'Bearer '+tok}});
    const d=await r.json();if(!d.files)return;
    for(const f of d.files){
      const imgKey=f.name.replace(/\.jpg$/,'');
      const localKey=sk('img_'+imgKey);
      if(!localStorage.getItem(localKey)){
        const fr=await fetch('https://www.googleapis.com/drive/v3/files/'+f.id+'?alt=media',{headers:{Authorization:'Bearer '+tok}});
        const buf=await fr.arrayBuffer();
        const b64=btoa(String.fromCharCode(...new Uint8Array(buf)));
        localStorage.setItem(localKey,'data:image/jpeg;base64,'+b64);
      }
    }
  }catch(e){console.warn('img sync from drive',e);}
}

function _workoutsToXlsBytes(){
  if(typeof XLSX==='undefined')return null;
  const rows=[['Group','Icon','Exercise Name','Sets','Reps','Weight kg','Rest sec','Notes']];
  S.workouts.forEach(w=>w.exercises.forEach(ex=>rows.push([w.name,w.icon,ex.name,ex.sets,ex.reps,ex.weight,ex.rest,ex.notes||''])));
  const wb=XLSX.utils.book_new();
  const ws=XLSX.utils.aoa_to_sheet(rows);
  ws['!cols']=[{wch:16},{wch:6},{wch:26},{wch:6},{wch:8},{wch:10},{wch:10},{wch:40}];
  XLSX.utils.book_append_sheet(wb,ws,'Workouts');
  return XLSX.write(wb,{type:'array',bookType:'xlsx'});
}

function _xlsBytesToWorkouts(bytes){
  if(typeof XLSX==='undefined')return null;
  const wb=XLSX.read(bytes,{type:'array'});
  const ws=wb.Sheets[wb.SheetNames[0]];
  const rows=XLSX.utils.sheet_to_json(ws,{header:1});
  if(!rows||rows.length<2)return null;
  const groups={},order=[];
  rows.slice(1).filter(r=>r[0]&&r[2]).forEach(r=>{
    const gn=String(r[0]||'').trim(),gi=String(r[1]||'💪').trim(),n=String(r[2]||'').trim();
    if(!gn||!n)return;
    if(!groups[gn]){groups[gn]={name:gn,icon:gi,exercises:[]};order.push(gn);}
    const gx=groups[gn].exercises;
    gx.push({id:gx.length+1,name:n,sets:parseInt(r[3])||3,reps:String(r[4]||'10').trim(),weight:parseFloat(r[5])||0,rest:parseInt(r[6])||60,notes:String(r[7]||'').trim()});
  });
  if(!order.length)return null;
  return order.map(gn=>({key:'xls_'+gn.replace(/\s+/g,'_').toLowerCase()+'_'+Date.now(),...groups[gn]}));
}

async function syncAppToDrive(){
  const tok=getToken();if(!tok||!currentUser){alert('Please log in first');return;}
  _setSyncStatus('syncing');
  try{
    const{fid,imgFid}=await _ensureFolders(tok);
    const bytes=_workoutsToXlsBytes();if(!bytes)throw new Error('SheetJS not loaded');
    const fname=_progDriveFilename();
    const qf=encodeURIComponent("name='"+fname+"' and '"+fid+"' in parents and trashed=false");
    const sr=await fetch('https://www.googleapis.com/drive/v3/files?q='+qf+'&fields=files(id)',{headers:{Authorization:'Bearer '+tok}});
    const sd=await sr.json();
    const existId=sd.files&&sd.files.length?sd.files[0].id:null;
    const uploadedId=await _uploadDrive(tok,bytes,existId,fid,fname);
    localStorage.setItem(sk('drive_link_'+_activeProg),'https://drive.google.com/file/d/'+uploadedId+'/view');
    await _syncImgsToDrive(tok,imgFid);
    _setSyncStatus('ok');
    alert('✅ Synced to Drive\n📊 '+fname+'\n\nOpen in Google Sheets to edit, then use Drive → App to sync back.');
  }catch(e){console.error('syncAppToDrive',e);_setSyncStatus('error');alert('Sync failed: '+e.message);}
}

async function syncDriveToApp(){
  const tok=getToken();if(!tok||!currentUser){alert('Please log in first');return;}
  _setSyncStatus('syncing');
  try{
    const{fid,imgFid}=await _ensureFolders(tok);
    const fname=_progDriveFilename();
    const qf=encodeURIComponent("name='"+fname+"' and '"+fid+"' in parents and trashed=false");
    const sr=await fetch('https://www.googleapis.com/drive/v3/files?q='+qf+'&fields=files(id)',{headers:{Authorization:'Bearer '+tok}});
    const sd=await sr.json();
    if(!sd.files||!sd.files.length){_setSyncStatus('idle');if(confirm('No file "'+fname+'" on Drive.\nCreate it from current app data?'))await syncAppToDrive();return;}
    const fileId=sd.files[0].id;
    localStorage.setItem(sk('drive_link_'+_activeProg),'https://drive.google.com/file/d/'+fileId+'/view');
    const r=await fetch('https://www.googleapis.com/drive/v3/files/'+fileId+'?alt=media',{headers:{Authorization:'Bearer '+tok}});
    if(!r.ok)throw new Error('download '+r.status);
    const buf=await r.arrayBuffer();
    const workouts=_xlsBytesToWorkouts(new Uint8Array(buf));
    if(!workouts)throw new Error('Could not parse Excel file');
    S.workouts=workouts;saveWorkouts();
    await _syncImgsFromDrive(tok,imgFid);
    _setSyncStatus('ok');render();
    alert('✅ Loaded from Drive\n📊 '+fname+'\nImages also synced.');
  }catch(e){console.error('syncDriveToApp',e);_setSyncStatus('error');alert('Sync failed: '+e.message);}
}

async function checkDriveOnLogin(){
  const tok=getToken();if(!tok||!currentUser)return;
  _setSyncStatus('syncing');
  try{
    const{fid}=await _ensureFolders(tok);
    const fname=_progDriveFilename();
    const qf=encodeURIComponent("name='"+fname+"' and '"+fid+"' in parents and trashed=false");
    const sr=await fetch('https://www.googleapis.com/drive/v3/files?q='+qf+'&fields=files(id)',{headers:{Authorization:'Bearer '+tok}});
    const sd=await sr.json();
    if(sd.files&&sd.files.length){
      localStorage.setItem(sk('drive_link_'+_activeProg),'https://drive.google.com/file/d/'+sd.files[0].id+'/view');
      _setSyncStatus('ok');
      if(confirm('Found "'+fname+'" on Google Drive.\nLoad workouts from Drive?'))await syncDriveToApp();
    } else {
      const bytes=_workoutsToXlsBytes();
      if(bytes){
        const uploadedId=await _uploadDrive(tok,bytes,null,fid,fname);
        localStorage.setItem(sk('drive_link_'+_activeProg),'https://drive.google.com/file/d/'+uploadedId+'/view');
        _setSyncStatus('ok');
        alert('Created "'+DRIVE_FOLDER_NAME+'/'+fname+'" on Google Drive.\n\nEdit it in Google Sheets and sync back to the app!');
      }
    }
  }catch(e){console.error('checkDriveOnLogin',e);_setSyncStatus('error');}
}

// ─── State ──────────────────────────────────────────────────
const S={
  screen:'home',workouts:[],history:[],
  session:{workoutIdx:null,exerciseIdx:0,setNum:1},
  rest:{total:0,remaining:0,timer:null,onDone:null},
  edit:{workoutIdx:null,exerciseIdx:null,temp:null},
  modal:{type:null,data:null},
};

// ─── Speech ─────────────────────────────────────────────────
let _speechUnlocked=false;
function _unlockSpeech(){
  if(_speechUnlocked||!window.speechSynthesis)return;
  const u=new SpeechSynthesisUtterance('');u.volume=0;u.rate=2;
  window.speechSynthesis.speak(u);_speechUnlocked=true;
}
function _speak(text){
  if(localStorage.getItem('nu_mute')==='1')return;
  if(!window.speechSynthesis)return;
  if(window.speechSynthesis.paused)window.speechSynthesis.resume();
  window.speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(text);
  u.lang=lang==='he'?'he-IL':'en-US';u.rate=0.95;u.volume=1;
  window.speechSynthesis.speak(u);
}
function _muted(){return localStorage.getItem('nu_mute')==='1';}
function _toggleMute(){
  const m=_muted();localStorage.setItem('nu_mute',m?'0':'1');
  const btn=document.getElementById('mute-btn');if(btn)btn.textContent=m?t('muteOff'):t('muteOn');
}

// ─── Utils ──────────────────────────────────────────────────
const $id=id=>document.getElementById(id);
const $app=()=>$id('app');
function fmtTime(s){return s>=60?Math.floor(s/60)+':'+String(s%60).padStart(2,'0'):String(s);}
function nextId(a){return a.reduce((m,e)=>Math.max(m,e.id),0)+1;}
function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function go(s){stopRest();S.screen=s;render();}

// ─── Render router ───────────────────────────────────────────
function render(){
  switch(S.screen){
    case'home':renderHome();break;
    case'edit':renderEdit();break;
    case'editExercise':renderEditExercise();break;
    case'workout':renderWorkout();break;
    case'rest':renderRest();break;
    case'finish':renderFinish();break;
  }
  renderModal();
}

// ─── HOME ────────────────────────────────────────────────────
function renderHome(){
  const sub=profileSubtitle();
  const chips=S.history.slice(0,7).map(h=>{const w=S.workouts.find(wk=>wk.key===h.key);return'<div class="chip">'+(w?w.icon:'💪')+' '+h.date+'</div>';}).join('');
  const avatar=currentUser&&currentUser.picture
    ?'<button class="avatar-btn" data-a="openModal" data-type="profile"><img class="user-avatar-sm" src="'+esc(currentUser.picture)+'" onerror="this.parentElement.innerHTML=\'<div class=&quot;avatar-placeholder&quot; data-a=&quot;openModal&quot; data-type=&quot;profile&quot;>👤</div>\'"></button>'
    :'<div class="avatar-placeholder" data-a="openModal" data-type="profile">👤</div>';
  const cards=S.workouts.map((w,idx)=>'<div class="wcard"><div class="wcard-name">'+esc(w.icon)+' '+esc(w.name)+'</div><div class="wcard-count">'+w.exercises.length+' '+t(w.exercises.length!==1?'exercises':'exercise')+'</div><div class="wcard-btns"><button class="btn btn-primary btn-start" data-a="start" data-idx="'+idx+'">'+t('start')+'</button><button class="btn btn-ghost btn-edit" data-a="editW" data-idx="'+idx+'">'+t('edit')+'</button></div></div>').join('');
  $app().innerHTML=
    '<div class="home-wrap">'+
    '<div class="home-topbar">'+
    '<div class="home-logo"><img src="images/icon.png" class="app-icon" alt="" onerror="this.style.display=\'none\'">'+
    '<div><div class="app-name">'+t('appName')+'</div>'+
    (sub?'<div class="app-sub">'+esc(sub)+'</div>':'<div class="app-sub" data-a="openModal" data-type="profile" style="cursor:pointer;color:var(--teal);">'+t('setupProfile')+' →</div>')+
    '</div></div>'+
    '<div class="home-actions">'+avatar+'<button class="lang-btn" data-a="toggleLang">'+t('language')+'</button><button class="close-btn" data-a="closeApp">✕</button></div>'+
    '</div>'+
    '<div class="prog-bar">'+
    '<span class="prog-name" data-a="openModal" data-type="programs">📋 '+esc(_getActiveProg().name)+'</span>'+
    (currentUser?'<span id="sync-ind" class="sync-ind" data-a="syncNow" title="Tap to sync">☁</span>':'')+
    '</div>'+
    (S.history.length?'<p class="sec-label">'+t('recentSessions')+'</p><div class="hist-strip">'+chips+'</div>':'')+
    '<p class="sec-label">'+t('workouts')+'</p>'+cards+
    '<div style="margin-top:8px;"><button class="btn-add" data-a="openModal" data-type="addWorkout">'+t('addWorkout')+'</button>'+
    '<button class="btn-add btn-import" data-a="openModal" data-type="importExport">⬆⬇ '+t('importExport')+'</button></div></div>';
}

// ─── EDIT ────────────────────────────────────────────────────
function renderEdit(){
  const wi=S.edit.workoutIdx,w=S.workouts[wi];
  const items=w.exercises.map((ex,ei)=>{const img=getImg(w.key,ex.id);return'<div class="exercise-item">'+(img?'<div class="ex-thumb"><img src="'+img+'" alt=""></div>':'<div class="ex-thumb">🏋️</div>')+'<div class="ex-info"><div class="ex-name">'+esc(ex.name)+'</div><div class="ex-meta">'+ex.sets+' × '+esc(ex.reps)+(ex.weight>0?' · '+ex.weight+t('weightUnit'):'')+'</div></div><div class="ex-actions"><button class="btn-icon" data-a="editEx" data-wi="'+wi+'" data-ei="'+ei+'">✏️</button><button class="btn-icon" data-a="delEx" data-wi="'+wi+'" data-ei="'+ei+'">🗑️</button></div></div>';}).join('');
  $app().innerHTML=
    '<div class="screen-header"><button class="btn-back" data-a="home">'+t('back')+'</button>'+
    '<span class="screen-title" style="display:flex;align-items:center;gap:6px;">'+
    '<span>'+esc(w.icon)+' '+esc(w.name)+'</span>'+
    '<button class="btn-icon" style="font-size:15px;padding:0 4px;" data-a="editGroupName" data-wi="'+wi+'">✏️</button>'+
    '</span>'+
    '<button class="btn-danger" data-a="promptDelW" data-wi="'+wi+'">'+t('delete')+'</button></div>'+
    '<div class="edit-wrap">'+items+'<button class="btn-add" data-a="addEx" data-wi="'+wi+'" style="margin-top:8px;">'+t('addExercise')+'</button></div>';
}

// ─── EDIT EXERCISE ───────────────────────────────────────────
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

// ─── WORKOUT ─────────────────────────────────────────────────
function renderWorkout(){
  const{workoutIdx:wi,exerciseIdx:ei,setNum}=S.session;
  const w=S.workouts[wi],ex=w.exercises[ei];
  const pct=((ei+setNum/ex.sets)/w.exercises.length*100).toFixed(1);
  const isLastSet=setNum===ex.sets;
  const img=getImg(w.key,ex.id);
  // Button: Start (set 1) / Next Set (sets 2+) / Complete (last set)
  const btnLabel=isLastSet?t('complete'):setNum===1?t('startSet'):t('nextSet');
  // Weight display: smart lbs if imperial
  const wDisp=ex.weight>0?(getUnits()==='imperial'?kgToSmartLbs(ex.weight)+' lbs':ex.weight+' kg'):'BW';
  $app().innerHTML='<div class="workout-wrap"><div class="progress-row"><span class="progress-lbl">'+t('exercise')+' '+(ei+1)+' / '+w.exercises.length+'</span><span class="exit-lnk" data-a="exitW">⏹ '+t('exit')+'</span></div><div class="progress-track"><div class="progress-fill" style="width:'+pct+'%"></div></div>'+(img?'<img class="ex-image" src="'+img+'" alt="'+esc(ex.name)+'">':'')+'<div class="ex-name-large">'+esc(ex.name)+'</div><div class="ex-group-lbl">'+esc(w.icon)+' '+esc(w.name)+'</div><div class="set-display"><div class="set-label">'+t('set')+'</div><div><span class="set-num">'+setNum+'</span><span class="set-total"> / '+ex.sets+'</span></div></div><div class="stats-grid"><div class="stat-box"><div class="stat-label">'+t('reps')+'</div><div class="stat-value">'+esc(ex.reps)+'</div></div><div class="stat-box"><div class="stat-label">'+t('weight')+'</div><div class="stat-value">'+wDisp+'</div></div></div>'+(ex.notes?'<div class="notes-box">💡 '+esc(ex.notes)+'</div>':'')+'<div class="spacer"></div><button class="btn btn-primary" data-a="doSet">'+btnLabel+'</button><button class="btn btn-skip" data-a="skipEx">'+t('skipExercise')+'</button></div>';
}

// ─── REST ────────────────────────────────────────────────────
function renderRest(){
  const{remaining,total}=S.rest;
  const{workoutIdx:wi,exerciseIdx:ei,setNum}=S.session;
  const w=S.workouts[wi],ex=w.exercises[ei];
  const nextLabel=t('set')+' '+(setNum+1)+' / '+ex.sets+' — '+esc(ex.name);
  const R=80,CX=100,CY=100,circ=2*Math.PI*R;
  const elapsed=total>0?(total-remaining)/total:0;
  const off=(circ*elapsed).toFixed(3);
  const img=getImg(w.key,ex.id);
  $app().innerHTML=
    '<div class="rest-screen">'+
    (img?'<img class="rest-ex-img" src="'+img+'" alt="">':'')+
    '<p class="rest-label">'+t('restLabel')+'</p>'+
    '<div class="rest-card">'+
    '<div class="rest-ring-wrap">'+
    '<svg width="200" height="200" viewBox="0 0 200 200" style="display:block;filter:drop-shadow(0 0 10px rgba(230,253,30,0.5));">'+
    '<circle cx="'+CX+'" cy="'+CY+'" r="'+R+'" fill="none" stroke="#333300" stroke-width="7"/>'+
    '<circle cx="'+CX+'" cy="'+CY+'" r="'+R+'" fill="none" stroke="#E6FD1E" stroke-width="7" stroke-linecap="round" stroke-dasharray="'+circ.toFixed(3)+'" stroke-dashoffset="'+off+'" transform="rotate(-90 '+CX+' '+CY+')" style="transition:stroke-dashoffset 1s linear;"/>'+
    '</svg>'+
    '<div class="rest-time-overlay">'+
    '<span class="rest-time-val">'+fmtTime(remaining)+'</span>'+
    '<span class="rest-time-unit">'+t('restUnit')+'</span>'+
    '</div></div>'+
    '<p class="rest-next"><strong>'+nextLabel+'</strong></p>'+
    '</div>'+
    '<div class="rest-actions-row">'+
    '<button id="mute-btn" class="rest-mute-btn" data-a="toggleMute">'+(_muted()?t('muteOn'):t('muteOff'))+'</button>'+
    '<button class="rest-skip-btn" data-a="skipRest">'+t('skipRest')+'</button>'+
    '</div></div>';
}

// ─── FINISH ──────────────────────────────────────────────────
function renderFinish(){
  const w=S.workouts[S.session.workoutIdx];
  const d=new Date().toLocaleDateString(lang==='he'?'he-IL':'en-US',{weekday:'short',month:'short',day:'numeric'});
  $app().innerHTML='<div class="finish-screen"><div class="finish-emoji">🎉</div><h1 class="finish-title">'+t('workoutDone')+'</h1><p class="finish-sub">'+esc(w.icon)+' '+esc(w.name)+' · '+d+'</p><button class="btn btn-primary" data-a="home" style="max-width:280px;">'+t('backToHome')+'</button></div>';
}

// ─── PROFILE MODAL builder ───────────────────────────────────
function buildProfileModal(){
  const prof=getProfile(),units=getUnits();
  const bmi=calcBMI(prof.weight,prof.height),cat=bmiCat(bmi);
  let heightHtml;
  if(units==='imperial'){
    let fv='',iv='';if(prof.height){const c=cmToFtIn(prof.height);fv=c.ft;iv=c.inches;}
    heightHtml='<div class="form-row2"><div class="form-group"><label class="form-label">ft</label><input id="p-ft" class="form-input" type="number" value="'+fv+'" min="1" max="8" placeholder="ft"></div><div class="form-group"><label class="form-label">in</label><input id="p-in" class="form-input" type="number" value="'+iv+'" min="0" max="11" step="0.5" placeholder="in"></div></div><span class="form-error" id="err-h"></span>';
  } else {
    heightHtml='<div class="form-group"><input id="p-height" class="form-input" type="number" value="'+(prof.height||'')+'" min="50" max="272" placeholder="cm"><span class="form-error" id="err-h"></span></div>';
  }
  const dispW=units==='imperial'&&prof.weight?kgToSmartLbs(prof.weight):(prof.weight||'');
  const wMin=units==='imperial'?44:20,wMax=units==='imperial'?880:400;
  let googleHtml;
  if(currentUser&&currentUser.provider==='google'){
    googleHtml='<div class="user-info-row">'+(currentUser.picture?'<img class="user-pic" src="'+esc(currentUser.picture)+'" onerror="this.style.display=\'none\'">':'')+'<div><div class="user-name">'+esc(currentUser.name)+'</div><div class="user-email">'+esc(currentUser.email)+'</div></div></div><button class="btn btn-ghost" data-a="signOut" style="font-size:13px;padding:10px;margin-bottom:12px;">'+t('signOut')+'</button>';
  } else if(typeof GOOGLE_CLIENT_ID!=='undefined'&&GOOGLE_CLIENT_ID){
    googleHtml='<button class="google-signin-btn" data-a="signInGoogle">'+G_SVG+t('signInGoogle')+'</button>';
  } else {
    googleHtml='<p class="not-config-note">'+t('googleNotConfigured').replace(/\n/g,'<br>')+'</p>';
  }
  return '<div class="modal-title">'+t('yourProfile')+'</div>'+
    googleHtml+'<div class="divider"></div>'+
    '<div class="units-row"><span class="units-label">'+t('units')+'</span>'+
    '<div class="units-toggle">'+
    '<button class="unit-btn'+(units==='metric'?' active':'')+'" data-a="setUnits" data-units="metric">'+t('metric')+'</button>'+
    '<button class="unit-btn'+(units==='imperial'?' active':'')+'" data-a="setUnits" data-units="imperial">'+t('imperial')+'</button>'+
    '</div></div>'+
    '<div class="form-group"><label class="form-label">'+t('nameLbl')+'</label><input id="p-name" class="form-input" type="text" value="'+esc(prof.name||'')+'"></div>'+
    '<div class="form-group"><label class="form-label">'+t('ageLbl')+'</label><input id="p-age" class="form-input" type="number" value="'+(prof.age||'')+'" min="1" max="120"><span class="form-error" id="err-age"></span></div>'+
    '<div class="form-group"><label class="form-label">'+t('heightLbl')+' ('+t('heightUnit_'+units.charAt(0))+')</label>'+heightHtml+'</div>'+
    '<div class="form-group"><label class="form-label">'+t('weightLbl')+' ('+t('weightUnit_'+units.charAt(0))+')</label><input id="p-weight" class="form-input" type="number" value="'+dispW+'" min="'+wMin+'" max="'+wMax+'" step="0.5"><span class="form-error" id="err-w"></span></div>'+
    '<div id="bmi-display">'+(bmi?'<div class="bmi-box"><div class="bmi-val" style="color:'+cat.color+'">'+bmi+'</div><div class="bmi-cat" style="color:'+cat.color+'">'+cat.label+'</div></div>':'')+'</div>'+
    '<div class="flex-gap mt-12"><button class="btn btn-ghost" data-a="closeModal">'+t('cancel')+'</button><button class="btn btn-primary" data-a="saveProfileBtn">'+t('saveProfile')+'</button></div>';
}

function updateBmiDisplay(){
  const units=getUnits();let wkg=0,hcm=0;
  if(units==='imperial'){const lbs=parseFloat(($id('p-weight')||{}).value);const ft=parseInt(($id('p-ft')||{}).value)||0;const iin=parseFloat(($id('p-in')||{}).value)||0;wkg=lbs?lbsToNearestKg(lbs):0;hcm=(ft||iin)?ftInToCm(ft,iin):0;}
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
    if(!ageErr&&!hErr&&!wErr){if(ft||iin)heightCm=ftInToCm(parseInt(ft)||0,parseFloat(iin)||0);if(lbs)weightKg=lbsToNearestKg(parseFloat(lbs));}
  } else {
    const h=($id('p-height')||{}).value||'';const w=($id('p-weight')||{}).value||'';
    ageErr=valAge(age);hErr=valHeightM(h);wErr=valWeightM(w);
    if(!ageErr&&!hErr&&!wErr){heightCm=h?parseFloat(h):'';weightKg=w?parseFloat(w):'';}
  }
  const ea=$id('err-age'),eh=$id('err-h'),ew=$id('err-w');
  if(ea)ea.textContent=ageErr||'';if(eh)eh.textContent=hErr||'';if(ew)ew.textContent=wErr||'';
  if(ageErr||hErr||wErr)return;
  saveProfile({name,age:age?parseInt(age):'',height:heightCm,weight:weightKg});
  closeModal();render();
}

// ─── MODALS ──────────────────────────────────────────────────
function openModal(type,data){S.modal={type,data:data||{}};renderModal();}
function closeModal(){S.modal={type:null,data:null};const m=$id('gem-modal');if(m)m.remove();}

function renderModal(){
  const ex=$id('gem-modal');if(ex)ex.remove();
  if(!S.modal.type)return;
  const ICONS=['💪','🔙','🦵','🔥','🏠','🏋️','🤸','⚡','🎯','🌊','🧘','🏃','🥊','🚴','🧗','🤾'];
  let inner='';

  if(S.modal.type==='addWorkout'||S.modal.type==='editGroup'){
    const wi=S.modal.type==='editGroup'?S.modal.data.wi:null;
    const sel=(S.modal.data&&S.modal.data.icon)||'💪';
    const prefill=S.modal.type==='editGroup'?esc(S.modal.data.name||''):'';
    inner='<div class="modal-title">'+(S.modal.type==='editGroup'?t('editGroup'):t('newWorkout'))+'</div>'+
      '<div class="form-group"><label class="form-label">'+t('name')+'</label>'+
      '<input id="modal-name" class="form-input" type="text" value="'+prefill+'" placeholder="e.g. Arms, HIIT..."></div>'+
      '<div class="form-group"><label class="form-label">'+t('icon')+'</label>'+
      '<div class="icon-grid">'+ICONS.map(ic=>'<button class="icon-btn'+(ic===sel?' selected':'')+'" data-a="selIcon" data-icon="'+ic+'">'+ic+'</button>').join('')+'</div></div>'+
      '<div class="flex-gap mt-12"><button class="btn btn-ghost" data-a="closeModal">'+t('cancel')+'</button>'+
      (wi!==null?'<button class="btn btn-primary" data-a="saveGroup" data-wi="'+wi+'">'+t('save')+'</button>':'<button class="btn btn-primary" data-a="createW">'+t('create')+'</button>')+
      '</div>';
  } else if(S.modal.type==='deleteWorkout'){
    const wi=S.modal.data.wi,wn=S.workouts[wi]?S.workouts[wi].name:'';
    inner='<div class="modal-title">'+t('deleteWorkout')+'</div><p style="color:var(--gray);font-size:13px;text-align:center;margin-bottom:4px;">'+esc(wn)+'</p><p style="color:var(--gray);font-size:12px;text-align:center;margin-bottom:16px;">'+t('deleteHint')+'</p><div class="form-group"><label class="form-label">'+t('typeDeletePrompt')+'</label><input id="del-confirm-input" class="form-input" type="text" placeholder="'+t('typeDeletePlaceholder')+'" autocomplete="off"></div><div class="flex-gap mt-12"><button class="btn btn-ghost" data-a="closeModal">'+t('cancel')+'</button><button class="btn btn-red" id="del-ok-btn" data-a="confirmDelW" data-wi="'+wi+'" style="opacity:.4;cursor:not-allowed;" disabled>'+t('confirmDelete')+'</button></div>';
  } else if(S.modal.type==='importExport'){
    inner='<div class="modal-title">'+t('importExport')+'</div><p style="color:var(--gray);font-size:13px;text-align:center;margin-bottom:20px;">'+t('importNote')+'</p><div style="display:flex;flex-direction:column;gap:12px;"><button class="btn btn-primary" data-a="downloadTemplate">'+t('downloadTemplate')+'</button><div class="upload-area"><p>'+t('uploadFile')+'</p><input type="file" id="import-file" accept=".csv,.xlsx,.xls"></div></div><div class="mt-16"><button class="btn btn-ghost" data-a="closeModal">'+t('cancel')+'</button></div>';
  } else if(S.modal.type==='syncDrive'){
    const driveLink=localStorage.getItem(sk('drive_link_'+_activeProg))||'';
    const fname=_progDriveFilename();
    inner='<div class="modal-title">☁ '+(lang==='he'?'סנכרון עם Drive':'Sync with Drive')+'</div>'+
      '<div class="drive-info-box">'+
      '<p style="font-size:13px;font-weight:600;margin-bottom:4px;">📊 '+esc(fname)+'</p>'+
      '<p style="font-size:11px;color:var(--gray);margin-bottom:8px;">'+t('driveNote')+'</p>'+
      (driveLink?'<a href="'+driveLink+'" target="_blank" style="color:var(--teal);font-size:12px;">'+t('openInDrive')+'</a>':'<span style="color:var(--gray);font-size:11px;">Sync once to get the link</span>')+
      '</div>'+
      '<div style="display:flex;flex-direction:column;gap:10px;margin-top:14px;">'+
      '<button class="btn btn-primary" data-a="syncAppToDrive">⬆ '+(lang==='he'?'אפליקציה → Drive':'App → Drive')+'</button>'+
      '<p style="color:var(--gray);font-size:11px;text-align:center;margin:-4px 0 0;">'+(lang==='he'?'שולח עדכונים + תמונות':'Uploads workouts + images to Drive')+'</p>'+
      '<button class="btn btn-ghost" data-a="syncDriveToApp">⬇ '+(lang==='he'?'Drive → אפליקציה':'Drive → App')+'</button>'+
      '<p style="color:var(--gray);font-size:11px;text-align:center;margin:-4px 0 0;">'+(lang==='he'?'מוריד עדכונים + תמונות':'Downloads workouts + images from Drive')+'</p>'+
      '</div>'+
      '<p style="color:var(--gray);font-size:11px;text-align:center;margin-top:10px;">'+t('imgNote')+'</p>'+
      '<div class="mt-12"><button class="btn btn-ghost" data-a="closeModal">'+t('cancel')+'</button></div>';
  } else if(S.modal.type==='programs'){
    const rows=_programs.map(p=>{
      const wCount=(JSON.parse(localStorage.getItem(skP('workouts',p.key))||'[]')||[]).length;
      const isActive=p.key===_activeProg;
      return '<div class="prog-row'+(isActive?' prog-active':'')+'">'+
        '<div class="prog-row-info">'+
        '<span class="prog-row-name">'+esc(p.name)+(isActive?' <span class="prog-badge">'+t('activeProg')+'</span>':'')+'</span>'+
        '<span class="prog-row-count">'+(wCount||0)+' '+t('workouts')+'</span>'+
        '</div><div class="prog-row-btns">'+
        (!isActive?'<button class="btn-sm-yellow" data-a="loadProg" data-key="'+p.key+'">'+t('loadProg')+'</button>':'')+
        '<button class="btn-sm-ghost" data-a="renameProg" data-key="'+p.key+'">✏️</button>'+
        (!isActive?'<button class="btn-sm-ghost" data-a="deleteProg" data-key="'+p.key+'">🗑️</button>':'')+
        '</div></div>';
    }).join('');
    inner='<div class="modal-title">'+t('programs')+'</div>'+rows+
      '<button class="btn-add" data-a="newProgram" style="margin-top:12px;">'+t('newProgram')+'</button>'+
      '<div class="mt-12"><button class="btn btn-ghost" data-a="closeModal">'+t('cancel')+'</button></div>';
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

// ─── IMPORT / EXPORT ─────────────────────────────────────────
function downloadTemplate(){
  const rows=[['Group','Icon','Exercise Name','Sets','Reps','Weight kg','Rest sec','Notes'],
    ['Push (A)','💪','DB Bench Press',4,'8-10',20,90,'Retract shoulder blades'],
    ['Push (A)','💪','DB Shoulder Press',3,'8-10',12,75,'Seated 90 degrees'],
    ['Pull (B)','🔙','Single-Arm DB Row',4,'8-10',20,90,'Pull elbow to hip'],
    ['Legs','🦵','Bulgarian Split Squat',3,'10/leg',16,75,'3-sec descent']];
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
      else{rows=parseCSV(typeof ev.target.result==='string'?ev.target.result:new TextDecoder().decode(ev.target.result));}
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

// ─── REST TIMER ───────────────────────────────────────────────
function startRest(sec,onDone){
  stopRest();S.rest={total:sec,remaining:sec,timer:null,onDone};S.screen='rest';render();
  S.rest.timer=setInterval(()=>{
    S.rest.remaining--;
    const r=S.rest.remaining;
    if(r===10&&S.rest.total>=14)_speak(t('tenSecsLeft'));
    if(r===3)_speak(t('countThree'));
    if(r===2)_speak(t('countTwo'));
    if(r===1)_speak(t('countOne'));
    if(r<=0){_speak(t('goNow'));const d=S.rest.onDone;S.rest.onDone=null;stopRest();if(d)d();else{S.screen='workout';render();}}
    else renderRest();
  },1000);
}
function stopRest(){if(S.rest.timer){clearInterval(S.rest.timer);S.rest.timer=null;}}
function skipRest(){const d=S.rest.onDone;S.rest.onDone=null;stopRest();if(d)d();else{S.screen='workout';render();}}

// ─── WORKOUT SESSION ─────────────────────────────────────────
function startWorkout(wi){S.session={workoutIdx:wi,exerciseIdx:0,setNum:1};S.screen='workout';render();}

function doSet(){
  _unlockSpeech();
  const{workoutIdx:wi,exerciseIdx:ei,setNum}=S.session;
  const w=S.workouts[wi],ex=w.exercises[ei];
  const lastSet=setNum===ex.sets,lastEx=ei===w.exercises.length-1;
  if(lastSet){
    if(lastEx){finish();}
    else{S.session.exerciseIdx++;S.session.setNum=1;S.screen='workout';render();}
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

// ─── IMAGE CROPPER ───────────────────────────────────────────
const CROP_PX=300;let _crop={};
function showCropper(file,onSave){
  const reader=new FileReader();
  reader.onload=ev=>{
    const img=new Image();
    img.onload=()=>{
      const scale=Math.max(CROP_PX/img.naturalWidth,CROP_PX/img.naturalHeight);
      _crop={img,scale,sw:img.naturalWidth*scale,sh:img.naturalHeight*scale,
        ox:(img.naturalWidth*scale-CROP_PX)/2,oy:(img.naturalHeight*scale-CROP_PX)/2,onSave};
      _buildCropper();
    };img.src=ev.target.result;
  };reader.readAsDataURL(file);
}
function _buildCropper(){
  const wrap=document.createElement('div');wrap.id='gem-crop';
  wrap.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,0.97);z-index:300;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;padding:24px;';
  const lbl=document.createElement('p');lbl.style.cssText='color:#8E8E93;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin:0;';
  lbl.textContent=lang==='he'?'גרור לשינוי מיקום':'Drag to reposition  •  Square crop';
  const canvas=document.createElement('canvas');canvas.width=CROP_PX;canvas.height=CROP_PX;
  canvas.style.cssText='border:2px solid #E6FD1E;border-radius:14px;cursor:grab;touch-action:none;box-shadow:0 0 24px rgba(230,253,30,0.3);max-width:90vw;max-height:90vw;';
  _drawCrop(canvas);_addCropDrag(canvas);
  const row=document.createElement('div');row.style.cssText='display:flex;gap:10px;width:100%;max-width:'+CROP_PX+'px;';
  const btnC=document.createElement('button');btnC.textContent=lang==='he'?'ביטול':'Cancel';
  btnC.style.cssText='flex:1;background:transparent;color:#8E8E93;border:1px solid #2B2C30;border-radius:12px;padding:14px;font-size:15px;cursor:pointer;font-family:inherit;';
  btnC.onclick=()=>{const el=document.getElementById('gem-crop');if(el)el.remove();};
  const btnS=document.createElement('button');btnS.textContent=lang==='he'?'חתוך ושמור':'Crop & Save';
  btnS.style.cssText='flex:1;background:#E6FD1E;color:#121212;border:none;border-radius:12px;padding:14px;font-size:15px;font-weight:700;cursor:pointer;font-family:inherit;';
  btnS.onclick=()=>{
    const exp=document.createElement('canvas');exp.width=400;exp.height=400;
    const ctx=exp.getContext('2d');const{img,ox,oy,scale}=_crop;
    ctx.drawImage(img,ox/scale,oy/scale,CROP_PX/scale,CROP_PX/scale,0,0,400,400);
    if(_crop.onSave)_crop.onSave(exp.toDataURL('image/jpeg',0.88));
    const el=document.getElementById('gem-crop');if(el)el.remove();
  };
  row.appendChild(btnC);row.appendChild(btnS);
  wrap.appendChild(lbl);wrap.appendChild(canvas);wrap.appendChild(row);
  document.body.appendChild(wrap);
}
function _drawCrop(canvas){const ctx=canvas.getContext('2d');ctx.clearRect(0,0,CROP_PX,CROP_PX);ctx.drawImage(_crop.img,-_crop.ox,-_crop.oy,_crop.sw,_crop.sh);}
function _addCropDrag(canvas){
  let drag=false,sx=0,sy=0,sox=0,soy=0;
  function clamp(){_crop.ox=Math.max(0,Math.min(_crop.sw-CROP_PX,_crop.ox));_crop.oy=Math.max(0,Math.min(_crop.sh-CROP_PX,_crop.oy));}
  canvas.addEventListener('mousedown',e=>{drag=true;sx=e.clientX;sy=e.clientY;sox=_crop.ox;soy=_crop.oy;canvas.style.cursor='grabbing';});
  document.addEventListener('mousemove',e=>{if(!drag)return;_crop.ox=sox-(e.clientX-sx);_crop.oy=soy-(e.clientY-sy);clamp();_drawCrop(canvas);});
  document.addEventListener('mouseup',()=>{drag=false;canvas.style.cursor='grab';});
  canvas.addEventListener('touchstart',e=>{e.preventDefault();const t=e.touches[0];drag=true;sx=t.clientX;sy=t.clientY;sox=_crop.ox;soy=_crop.oy;},{passive:false});
  canvas.addEventListener('touchmove',e=>{if(!drag)return;e.preventDefault();const t=e.touches[0];_crop.ox=sox-(t.clientX-sx);_crop.oy=soy-(t.clientY-sy);clamp();_drawCrop(canvas);},{passive:false});
  canvas.addEventListener('touchend',()=>{drag=false;});
}

// ─── EVENTS ──────────────────────────────────────────────────
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
  if(a==='signInGoogle') {signInWithGoogle();return;}
  if(a==='syncNow')      {openModal('syncDrive',{});return;}
  if(a==='syncAppToDrive'){closeModal();syncAppToDrive();return;}
  if(a==='syncDriveToApp'){closeModal();syncDriveToApp();return;}
  if(a==='toggleMute')   {_toggleMute();return;}
  if(a==='editW')        {S.edit.workoutIdx=+T.dataset.idx;S.screen='edit';render();return;}
  if(a==='backEdit')     {S.screen='edit';render();return;}
  if(a==='promptDelW')   {openModal('deleteWorkout',{wi:+T.dataset.wi});return;}
  if(a==='confirmDelW')  {if(T.disabled)return;S.workouts.splice(+T.dataset.wi,1);saveWorkouts();closeModal();go('home');return;}
  if(a==='editGroupName'){const wi2=+T.dataset.wi,w2=S.workouts[wi2];openModal('editGroup',{wi:wi2,name:w2.name,icon:w2.icon});return;}
  if(a==='saveGroup')    {
    const wi2=+T.dataset.wi,nm=($id('modal-name')||{}).value||'';
    if(!nm.trim()){alert(t('name')+'?');return;}
    S.workouts[wi2].name=nm.trim();
    S.workouts[wi2].icon=(S.modal.data&&S.modal.data.icon)||S.workouts[wi2].icon;
    saveWorkouts();closeModal();S.edit.workoutIdx=wi2;S.screen='edit';render();return;
  }
  if(a==='addEx'){const wi2=+T.dataset.wi,w2=S.workouts[wi2];S.edit={workoutIdx:wi2,exerciseIdx:null,temp:{id:nextId(w2.exercises),name:t('newExercise'),sets:3,reps:'10-12',weight:10,rest:60,notes:''}};S.screen='editExercise';render();return;}
  if(a==='editEx'){const wi2=+T.dataset.wi,ei2=+T.dataset.ei;S.edit={workoutIdx:wi2,exerciseIdx:ei2,temp:Object.assign({},S.workouts[wi2].exercises[ei2])};S.screen='editExercise';render();return;}
  if(a==='delEx'){if(!confirm(t('areYouSure')))return;S.workouts[+T.dataset.wi].exercises.splice(+T.dataset.ei,1);saveWorkouts();render();return;}
  if(a==='saveEx'){
    const wi2=+T.dataset.wi,ei2=T.dataset.ei,ex2=S.edit.temp;
    ex2.name=($id('f-name')||{}).value||ex2.name;ex2.sets=parseInt(($id('f-sets')||{}).value)||3;
    ex2.reps=($id('f-reps')||{}).value||ex2.reps;ex2.weight=parseFloat(($id('f-wgt')||{}).value)||0;
    ex2.rest=parseInt(($id('f-rest')||{}).value)||0;ex2.notes=($id('f-notes')||{}).value||'';
    if(ei2==='new')S.workouts[wi2].exercises.push(ex2);else S.workouts[wi2].exercises[+ei2]=ex2;
    saveWorkouts();S.screen='edit';render();return;
  }
  if(a==='delImg'){delImg(S.workouts[+T.dataset.wi].key,+T.dataset.exid);render();return;}
  if(a==='openModal')    {openModal(T.dataset.type,{});return;}
  if(a==='closeModal')   {closeModal();return;}
  if(a==='selIcon')      {if(S.modal.data)S.modal.data.icon=T.dataset.icon;document.querySelectorAll('.icon-btn').forEach(b=>b.classList.toggle('selected',b.dataset.icon===T.dataset.icon));return;}
  if(a==='createW')      {const n=($id('modal-name')||{}).value||'';if(!n.trim()){alert(t('name')+'?');return;}const icon2=(S.modal.data&&S.modal.data.icon)||'💪';S.workouts.push({key:'c_'+Date.now(),name:n.trim(),icon:icon2,exercises:[]});saveWorkouts();closeModal();go('home');return;}
  if(a==='downloadTemplate'){downloadTemplate();return;}
  if(a==='saveProfileBtn'){saveProfileHandler();return;}
  if(a==='setUnits')     {localStorage.setItem('nu_units',T.dataset.units);if(S.modal.type==='profile'){renderModal();}return;}
  // Programs
  if(a==='loadProg')     {_switchProgram(T.dataset.key);closeModal();return;}
  if(a==='deleteProg')   {if(confirm(t('areYouSure'))){_deleteProgram(T.dataset.key);}return;}
  if(a==='renameProg')   {
    const rp=_programs.find(p=>p.key===T.dataset.key);if(!rp)return;
    const rn=prompt(t('progName'),rp.name);
    if(rn&&rn.trim()){_renameProgram(T.dataset.key,rn.trim());renderModal();}return;
  }
  if(a==='newProgram')   {
    const pn=prompt(t('progName')+':','');
    if(pn&&pn.trim()){_createProgram(pn.trim());closeModal();}return;
  }
});

// ─── INIT ────────────────────────────────────────────────────
async function initApp(){
  document.documentElement.dir=isRTL()?'rtl':'ltr';
  document.documentElement.lang=lang;
  // 1. Handle OAuth callback
  const fromGoogle=await handleOAuthCallback();
  // 2. Restore saved user
  if(!currentUser){
    const saved=localStorage.getItem('nu_current_user');
    if(saved){try{currentUser=JSON.parse(saved);}catch(e){}}
  }
  // 3. Load programs + data
  _loadPrograms();
  loadData();
  render();
  // 4. Restore cached Drive folder IDs
  if(currentUser){
    const dfid=localStorage.getItem(sk('dfid'));if(dfid)_driveFolderId=dfid;
    const dimgfid=localStorage.getItem(sk('dimgfid'));if(dimgfid)_driveImgFolderId=dimgfid;
  }
}
initApp();
