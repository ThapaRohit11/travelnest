"use client";

import Footer from "@/components/Footer";
import UserHeader from "@/components/UserHeader";
import { useHotels } from "@/lib/hotel-storage";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function HotelDetailsPage() {
  const {slug}=useParams<{slug:string}>();
  const hotel=useHotels().find(item=>item.slug===slug);
  if(!hotel)return <div className="min-h-screen bg-slate-50"><UserHeader/><main className="mx-auto max-w-3xl px-6 py-24 text-center"><h1 className="text-3xl font-bold">Hotel not found</h1><Link href="/user/hotels" className="mt-6 inline-block text-blue-600">Back to hotels</Link></main></div>;
  return <div className="min-h-screen bg-[#f7f8fb] text-slate-900"><UserHeader/><main className="px-4 py-4 sm:px-6 lg:px-8 lg:py-6"><div className="mx-auto max-w-[1280px]">
    <div className="h-[240px] rounded-[22px] bg-slate-200 bg-cover bg-center shadow-lg sm:h-[320px]" style={{backgroundImage:`url('${hotel.image}')`}}/>
    <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]"><section className="rounded-[22px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><h1 className="text-3xl font-extrabold sm:text-4xl">{hotel.name}</h1><p className="mt-4 text-sm text-slate-500">⌖ {hotel.location}, Nepal</p>
      <div className="mt-7"><h2 className="text-lg font-bold">About This Property</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">{hotel.description}</p></div>
      <div className="mt-7"><h2 className="text-lg font-bold">Amenities & Services</h2><div className="mt-4 grid gap-3 sm:grid-cols-2">{hotel.amenities.map(item=><div key={item} className="flex items-center gap-3 rounded-xl bg-[#eef5ff] px-4 py-3 text-sm font-medium"><span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-600 text-white">✓</span>{item}</div>)}</div></div>
    </section><aside className="rounded-[22px] bg-[#1f5cff] p-6 text-white shadow-xl sm:p-7"><p className="text-sm text-white/70">Price per night</p><p className="mt-2 text-4xl font-extrabold">NPR {hotel.price.toLocaleString()}</p><Link href={hotel.slug==="himalayan-paradise-resort"?"/user/hotels/himalayan-paradise-resort/booking":"/user/bookings"} className="mt-8 flex h-12 items-center justify-center rounded-xl bg-white text-sm font-bold text-blue-600">Reserve Now</Link><ul className="mt-10 space-y-4 text-sm">{hotel.highlights.map(item=><li key={item} className="flex gap-3"><span className="text-emerald-300">✓</span>{item}</li>)}</ul><ul className="mt-8 space-y-3 border-t border-white/15 pt-6 text-sm text-white/85">{hotel.extras.map(item=><li key={item}>○ {item}</li>)}</ul></aside></div>
  </div></main><Footer/></div>;
}
