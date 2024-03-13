import React, { useState } from 'react'
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import Chapter from './Chapter';

function Module({module,chapters}) {
  const [close, setClose] = useState(true);
  const filteredChapters = chapters.filter(
    (chapter) => chapter.module === module.id);
  
  return (
    <div className="p-1">
      <div className="grid grid-cols-8 justify-between border-b border-slate-300">
        <p className="col-span-7 font-bold text-black p-1">
          Module {module.moduleNo} : {module.title}
        </p>
        <div className="flex items-center justify-center text-lg font-bold text-black">
          {close ? (
            <FaAngleDown onClick={() => setClose(false)} aria-label="Expand" />
          ) : (
            <FaAngleUp onClick={() => setClose(true)} aria-label="Expand" />
          )}
        </div>
      </div>
      {!close && filteredChapters.map(chapter => (
        <Chapter key={chapter.id} chapter={chapter}/>
      ))}
    </div>
  );
}

export default Module