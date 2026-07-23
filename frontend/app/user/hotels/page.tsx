"use client";

import Footer from "@/components/Footer";
import Link from "next/link";
import UserHeader from "@/components/UserHeader";
import { useHotels } from "@/lib/hotel-storage";
import { useState } from "react";

export default function HotelsPage() {
  const hotels=useHotels();
  const [location,setLocation]=useState("");
  const [maxPrice,setMaxPrice]=useState("");

  const visible=hotels.filter(hotel=>hotel.status==="Active"&&hotel.location.toLowerCase().includes(location.toLowerCase())&&(!maxPrice||hotel.price<=Number(maxPrice)));

  return <div className="min-h-screen bg-[#f7f8fb] text-slate-900"><UserHeader/>
    <main className="px-4 py-6 sm:px-6 lg:px-8"><div className="mx-auto max-w-[1280px]">
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Explore Hotels in Nepal</h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start">
        <aside className="self-start rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.10)]"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className="h-5 w-5"><path d="M4 5h16l-6 7v5l-4 2v-7L4 5Z"/></svg></span><h2 className="text-xl font-bold">Filters</h2></div>
          <div className="mt-6 space-y-5"><label className="block text-sm font-semibold text-slate-600">Location<input value={location} onChange={e=>setLocation(e.target.value)} placeholder="Search by location" className="mt-2 h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"/></label><label className="block text-sm font-semibold text-slate-600">Maximum price<input value={maxPrice} onChange={e=>setMaxPrice(e.target.value)} type="number" placeholder="NPR per night" className="mt-2 h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"/></label></div>
        </aside>
        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">{visible.map(hotel=><article key={hotel.slug} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.08)]"><div className="h-40 bg-slate-200 bg-cover bg-center" style={{backgroundImage:`url('${hotel.image}')`}}/><div className="p-4"><h3 className="text-2xl font-bold leading-tight">{hotel.name}</h3><p className="mt-3 text-sm text-slate-500">⌖ {hotel.location}</p><div className="mt-6 flex items-end justify-between gap-3 border-t border-slate-100 pt-4"><div><p className="text-xs text-slate-400">Starting from</p><p className="text-2xl font-extrabold text-blue-600">NPR {hotel.price.toLocaleString()}</p></div><Link href={`/user/hotels/${hotel.slug}`} className="rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-semibold leading-tight text-white hover:bg-blue-700">View<br/>Details</Link></div></div></article>)}</section>
      </div>
    </div></main><Footer/></div>;
}
