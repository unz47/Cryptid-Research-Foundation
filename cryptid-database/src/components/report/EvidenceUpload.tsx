"use client";

import { useState, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

interface UploadedFile {
  name: string;
  url: string;
}

export default function EvidenceUpload() {
  const t = useTranslations("report");
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = useCallback(async (fileList: FileList) => {
    const remaining = 5 - files.length;
    if (remaining <= 0) return;
    setUploading(true);

    const toUpload = Array.from(fileList).slice(0, remaining);
    const uploaded: UploadedFile[] = [];

    for (const file of toUpload) {
      const ext = file.name.split(".").pop();
      const path = `reports/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from("evidence").upload(path, file);
      if (!error) {
        const { data } = supabase.storage.from("evidence").getPublicUrl(path);
        uploaded.push({ name: file.name, url: data.publicUrl });
      }
    }

    setFiles((prev) => [...prev, ...uploaded]);
    setUploading(false);
  }, [files.length]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length) upload(e.dataTransfer.files);
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
        <input ref={inputRef} type="file" accept="image/*,video/*" multiple hidden onChange={(e) => e.target.files && upload(e.target.files)} />
        {uploading ? (
          <p className="text-sm font-mono text-brand-500">Uploading...</p>
        ) : (
          <>
            <p className="text-sm font-mono text-neutral-500">{t("dropzone")}</p>
            <p className="text-[10px] font-mono text-neutral-400 mt-1">{t("dropzoneHint")}</p>
          </>
        )}
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
              {/* Hidden input to include URLs in form submission */}
              <input type="hidden" name="evidence_urls" value={f.url} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
