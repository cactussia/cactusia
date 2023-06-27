import create from 'zustand';

const useLang = create((set) => ({
    lang:[],
    langSelected:"en",
    setLangSelected:(lang)=>set(()=>({langSelected:lang})),
    setLang: (data)=>set(()=>({lang:data}))
}));

export default useLang;
