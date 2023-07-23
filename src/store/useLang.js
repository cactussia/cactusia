import create from 'zustand';

const langs=["en","fr"]
const useLang = create((set) => ({
    lang:[],
    langs:langs,
    langSelected:1,
    setLangSelected:(lang)=>set((state)=>({langSelected:state.langSelected==1?0:state.langSelected+1})),
    setLang: (data)=>set(()=>({lang:data}))
}));

export default useLang;
