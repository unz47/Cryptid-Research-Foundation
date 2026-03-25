"use client";

import { useState, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function EvidenceUpload() {
  const t = useTranslations("report");
  const [files, setFiles] = useState<{ name: string; url: string }[]>([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback((fileList: FileList) => {
    const newFiles = Array.from(fileList).slice(0, 5 - files.length).map((f) => ({
      name: f.name,
      url: URL.createObjectURL(f),
    }));
    setFiles((prev) => [...prev, ...newFiles].slice(0, 5));
  }, [files.length]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
  };

  const remove = (i: number) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== i));
  };

  return (
    <div>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-md p-8 text-center cursor-pointer transition-colors ${
          dragging ? "border-brand-500 bg-brand-50" : "border-neutral-400 bg-neutral-50 hover:border-brand-500 hover:bg-brand-50"
        }`}
      >
        <input ref={inputRef} type="file" accept="image/*,video/*" multiple hidden onChange={(e) => e.target.files && addFiles(e.target.files)} />
        <p className="text-sm font-mono text-neutral-500">{t("dropzone")}</p>
        <p className="text-[10px] font-mono text-neutral-400 mt-1">{t("dropzoneHint")}</p>
      </div>

      {files.length > 0 && (
        <div className="flex gap-3 mt-3 flex-wrap">
          {files.map((f, i) => (
            <div key={i} className="relative w-20 h-20 rounded border border-neutral-200 overflow-hidden group">
              <Image src={f.url} alt={f.name} fill className="object-cover" sizes="80px" />
              <button
                type="button"
                onClick={() => remove(i)}
                className="absolute top-0 right-0 w-5 h-5 bg-black/60 text-white text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
