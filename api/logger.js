const BACKEND_URL='https://script.google.com/macros/s/AKfycbwKYC6L8WskqrF3hS5H4fRr8UvD0YaIANXMXWkWC4apL0XeeQlqS5mBb8yTSsBzVJ3g4g/exec';

export default async function handler(req,res){
  if(req.method!=='POST')return res.status(405).json({ok:false,message:'Method not allowed.'});
  try{
    const r=await fetch(BACKEND_URL,{
      method:'POST',
      headers:{'content-type':'application/json'},
      body:JSON.stringify(req.body||{}),
      redirect:'follow'
    });
    const text=await r.text();
    let data;
    try{data=JSON.parse(text)}catch(_e){throw new Error('Backend returned a non-JSON response.')}
    res.status(r.ok?200:502).json(data);
  }catch(e){
    res.status(500).json({ok:false,message:e.message||String(e)});
  }
}