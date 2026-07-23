"use client";

import { useState } from "react";
import { createHotelSlug, defaultHotels, HotelRecord, saveStoredHotels, useHotels } from "@/lib/hotel-storage";
import { useRouter } from "next/navigation";

type Section = "Overview" | "Hotels" | "Bookings" | "Users" | "Reviews" | "Payments" | "Settings";

const navItems: { label: Section; icon: string }[] = [
  { label: "Overview", icon: "grid" },
  { label: "Hotels", icon: "hotel" },
  { label: "Bookings", icon: "calendar" },
  { label: "Users", icon: "users" },
];

const bookings = [
  { id: "#TN-1048", guest: "Aarav Sharma", initials: "AS", hotel: "Himalayan Paradise Resort", dates: "Jul 28 – Jul 31", amount: "NPR 25,500", status: "Pending" },
  { id: "#TN-1047", guest: "Sofia Martinez", initials: "SM", hotel: "Kathmandu Grand Hotel", dates: "Jul 26 – Jul 29", amount: "NPR 19,500", status: "Pending" },
  { id: "#TN-1046", guest: "Nima Sherpa", initials: "NS", hotel: "Everest View Lodge", dates: "Jul 24 – Jul 27", amount: "NPR 13,500", status: "Pending" },
  { id: "#TN-1045", guest: "Liam Wilson", initials: "LW", hotel: "Lakeside Boutique Hotel", dates: "Jul 22 – Jul 25", amount: "NPR 21,000", status: "Pending" },
  { id: "#TN-1044", guest: "Priya Thapa", initials: "PT", hotel: "Himalayan Paradise Resort", dates: "Jul 20 – Jul 23", amount: "NPR 17,000", status: "Pending" },
];

const registeredUsers = [
  { id: "USR-1001", name: "Rohit Thapa", email: "thapa@gmail.com", phone: "+977 9876543212", location: "Kathmandu", joined: "Jan 12, 2026", bookings: 4, status: "Active" },
  { id: "USR-1002", name: "Aarav Sharma", email: "aarav.sharma@email.com", phone: "+977 9812345678", location: "Pokhara", joined: "Feb 03, 2026", bookings: 6, status: "Active" },
  { id: "USR-1003", name: "Sofia Martinez", email: "sofia.martinez@email.com", phone: "+977 9801122334", location: "Lalitpur", joined: "Mar 18, 2026", bookings: 2, status: "Active" },
  { id: "USR-1004", name: "Nima Sherpa", email: "nima.sherpa@email.com", phone: "+977 9841556677", location: "Solukhumbu", joined: "Apr 09, 2026", bookings: 8, status: "Active" },
  { id: "USR-1005", name: "Liam Wilson", email: "liam.wilson@email.com", phone: "+977 9867788990", location: "Bhaktapur", joined: "May 24, 2026", bookings: 1, status: "Inactive" },
  { id: "USR-1006", name: "Priya Thapa", email: "priya.thapa@email.com", phone: "+977 9804455667", location: "Chitwan", joined: "Jun 11, 2026", bookings: 3, status: "Active" },
];

function Icon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  const paths: Record<string, React.ReactNode> = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></>,
    hotel: <><path d="M4 21V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v16M8 7h2m3 0h1M8 11h2m3 0h1M8 15h2m3 0h1M2 21h20"/><path d="M17 9h2a1 1 0 0 1 1 1v11"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
    star: <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z"/>,
    wallet: <><path d="M20 7V5a2 2 0 0 0-2-2H5a3 3 0 0 0 0 6h15v12H5a3 3 0 0 1-3-3V6"/><path d="M16 13h4"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V21h-4v-.08A1.7 1.7 0 0 0 9 19.37a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.63 15 1.7 1.7 0 0 0 3.08 14H3v-4h.08A1.7 1.7 0 0 0 4.63 9a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.63h.01A1.7 1.7 0 0 0 10 3.08V3h4v.08A1.7 1.7 0 0 0 15 4.63a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.37 9v.01A1.7 1.7 0 0 0 20.92 10H21v4h-.08A1.7 1.7 0 0 0 19.4 15Z"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M13.7 21h-3.4"/></>,
    menu: <path d="M4 7h16M4 12h16M4 17h16"/>,
    plus: <path d="M12 5v14M5 12h14"/>,
    arrow: <path d="m9 18 6-6-6-6"/>,
    trend: <path d="m3 17 6-6 4 4 8-8M14 7h7v7"/>,
    close: <path d="M18 6 6 18M6 6l12 12"/>,
    eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></>,
    trash: <><path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6"/><path d="M10 11v5M14 11v5"/></>,
    logout: <><path d="M10 17l5-5-5-5M15 12H3"/><path d="M14 3h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5"/></>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>{paths[name]}</svg>;
}

function Logo() {
  return <div className="flex items-center gap-3"><span className="grid h-9 w-9 grid-cols-2 gap-1 rounded-xl bg-blue-600 p-2 shadow-lg shadow-blue-200"><i className="rounded-sm bg-white"/><i className="rounded-sm bg-white"/><i className="rounded-sm bg-white"/><i className="rounded-sm bg-blue-200"/></span><span><b className="block text-lg leading-5 text-slate-900">TravelNest</b><small className="text-[10px] font-bold uppercase tracking-[.2em] text-blue-600">Admin</small></span></div>;
}

function Status({ value }: { value: string }) {
  const tone = value === "Confirmed" || value === "Active" || value === "Completed" ? "bg-emerald-50 text-emerald-700" : value === "Pending" || value === "Maintenance" ? "bg-amber-50 text-amber-700" : value === "Cancelled" ? "bg-rose-50 text-rose-700" : "bg-blue-50 text-blue-700";
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${tone}`}>{value}</span>;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [active, setActive] = useState<Section>("Overview");
  const [sidebar, setSidebar] = useState(false);
  const [modal, setModal] = useState<"hotel" | "booking" | null>(null);
  const [toast, setToast] = useState("");
  const managedHotels = useHotels();
  const [editingHotel, setEditingHotel] = useState<HotelRecord | null>(null);
  const [showLogout, setShowLogout] = useState(false);

  const navigate = (section: Section) => { setActive(section); setSidebar(false); };
  const save = () => { setModal(null); setToast("Saved successfully"); setTimeout(() => setToast(""), 2500); };
  const publishHotel = (hotel: HotelRecord, originalSlug?: string) => {
    const updated = originalSlug
      ? managedHotels.map(item => item.slug === originalSlug ? hotel : item)
      : [...managedHotels, hotel];
    saveStoredHotels(updated);
    setModal(null);
    setEditingHotel(null);
    setToast(originalSlug ? "Hotel information updated" : "Hotel published to the user side");
    setTimeout(() => setToast(""), 2500);
  };
  const deleteHotel = (hotel: HotelRecord) => {
    if (!window.confirm(`Delete ${hotel.name}? It will also be removed from the user side.`)) return;
    saveStoredHotels(managedHotels.filter(item => item.slug !== hotel.slug));
    setToast("Hotel deleted");
    setTimeout(() => setToast(""), 2500);
  };

  return (
    <div className="min-h-screen bg-[#f5f8fc] text-slate-900">
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-blue-100 bg-white px-4 py-6 transition-transform lg:translate-x-0 ${sidebar ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="px-2"><Logo /></div>
        <nav className="mt-9 space-y-1.5">
          {navItems.map((item) => <button key={item.label} onClick={() => navigate(item.label)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${active === item.label ? "bg-blue-600 text-white shadow-md shadow-blue-200" : "text-slate-500 hover:bg-blue-50 hover:text-blue-700"}`}><Icon name={item.icon}/>{item.label}{active === item.label && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white"/>}</button>)}
        </nav>
        <button onClick={()=>setShowLogout(true)} className="absolute bottom-6 left-4 right-4 flex items-center gap-3 rounded-xl border border-rose-100 px-3 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"><Icon name="logout"/>Logout</button>
      </aside>
      {sidebar && <button aria-label="Close menu" onClick={() => setSidebar(false)} className="fixed inset-0 z-30 bg-slate-900/35 lg:hidden"/>}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-20 items-center gap-4 border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur sm:px-7">
          <button onClick={() => setSidebar(true)} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"><Icon name="menu"/></button>
          <div><h1 className="text-xl font-bold">{active}</h1><p className="hidden text-xs text-slate-400 sm:block">Welcome back, Rohit</p></div>
        </header>

        <main className="p-4 sm:p-7">
          {active === "Overview" && <Overview navigate={navigate}/>}
          {active === "Hotels" && <Hotels data={managedHotels} open={() => {setEditingHotel(null);setModal("hotel");}} edit={hotel=>{setEditingHotel(hotel);setModal("hotel");}} remove={deleteHotel}/>}
          {active === "Bookings" && <Bookings data={bookings} open={() => setModal("booking")}/>}
          {active === "Users" && <Users/>}
          {active === "Reviews" && <Reviews/>}
          {active === "Payments" && <Payments/>}
          {active === "Settings" && <Settings save={save}/>}
        </main>
      </div>
      {modal && <Modal type={modal} close={() => {setModal(null);setEditingHotel(null);}} save={save} publishHotel={publishHotel} initialHotel={editingHotel}/>}
      {showLogout&&<div className="fixed inset-0 z-[60] grid place-items-center bg-slate-900/50 p-4 backdrop-blur-sm"><div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"><span className="grid h-12 w-12 place-items-center rounded-xl bg-rose-50 text-rose-600"><Icon name="logout"/></span><h2 className="mt-5 text-xl font-bold">Logout confirmation</h2><p className="mt-2 text-sm leading-6 text-slate-500">Are you sure you want to log out of the TravelNest admin panel?</p><div className="mt-6 flex justify-end gap-3"><button onClick={()=>setShowLogout(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button><button onClick={()=>router.push("/")} className="rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-rose-700">Yes, logout</button></div></div></div>}
      {toast && <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-xl">✓ {toast}</div>}
    </div>
  );
}

function Overview({ navigate }: { navigate: (s: Section) => void }) {
  const hotels = useHotels();
  const stats = [
    { title: "Total Bookings", value: "1,284", change: "+8.2%", note: "vs last month", icon: "calendar" },
    { title: "Total Hotels", value: hotels.length.toString(), change: `+${Math.max(hotels.length - defaultHotels.length, 0)}`, note: "added by admin", icon: "hotel" },
    { title: "Registered Guests", value: "8,642", change: "+18.4%", note: "vs last month", icon: "users" },
  ];
  return <div className="mx-auto max-w-[1500px]">
    <div className="mb-7"><h2 className="text-2xl font-extrabold tracking-tight">Good afternoon, Rohit 👋</h2><p className="mt-1 text-sm text-slate-500">Here&apos;s what&apos;s happening with TravelNest today.</p></div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{stats.map(s=><article key={s.title} className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"><div className="flex items-start justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600"><Icon name={s.icon}/></span><span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-600"><Icon name="trend" className="h-3 w-3"/>{s.change}</span></div><p className="mt-5 text-sm font-medium text-slate-500">{s.title}</p><p className="mt-1 text-2xl font-extrabold">{s.value}</p><p className="mt-1 text-xs text-slate-400">{s.note}</p></article>)}</div>
    <div className="mt-5"><TableCard title="Recent bookings" action={() => navigate("Bookings")}><BookingRows data={bookings.slice(0,4)}/></TableCard></div>
  </div>;
}

function TableCard({title, action, children}:{title:string; action?:()=>void; children:React.ReactNode}) { return <article className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm"><div className="flex items-center justify-between border-b border-slate-100 p-5"><div><h3 className="font-bold">{title}</h3><p className="text-xs text-slate-400">Manage and review your latest data</p></div>{action&&<button onClick={action} className="flex items-center gap-1 text-xs font-bold text-blue-600">View all <Icon name="arrow" className="h-3 w-3"/></button>}</div><div className="overflow-x-auto">{children}</div></article> }
function BookingRows({data,onStatusChange}:{data:typeof bookings;onStatusChange?:(id:string,status:string)=>void}) { return <table className="w-full min-w-[800px] text-left text-sm"><thead className="bg-slate-50/80 text-[11px] uppercase tracking-wider text-slate-400"><tr>{["Booking","Guest","Hotel","Stay dates","Amount","Status"].map(h=><th key={h} className="px-5 py-3 font-semibold">{h}</th>)}</tr></thead><tbody className="divide-y divide-slate-100">{data.map(b=><tr key={b.id} className="hover:bg-blue-50/30"><td className="px-5 py-4 font-bold text-blue-600">{b.id}</td><td className="px-5 py-4"><span className="flex items-center gap-2"><i className="grid h-8 w-8 place-items-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-700">{b.initials}</i><b className="font-semibold">{b.guest}</b></span></td><td className="px-5 py-4 text-slate-600">{b.hotel}</td><td className="px-5 py-4 text-slate-500">{b.dates}</td><td className="px-5 py-4 font-semibold">{b.amount}</td><td className="px-5 py-4">{onStatusChange?<select value={b.status} onChange={(event)=>onStatusChange(b.id,event.target.value)} className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 outline-none focus:border-blue-500"><option>Pending</option><option>Confirmed</option><option>Checked in</option><option>Completed</option><option>Cancelled</option></select>:<Status value={b.status}/>}</td></tr>)}</tbody></table>}

function Hotels({data,open,edit,remove}:{data:HotelRecord[];open:()=>void;edit:(hotel:HotelRecord)=>void;remove:(hotel:HotelRecord)=>void}) { return <SectionWrap title="Hotel management" subtitle="Manage properties, rooms, pricing and availability" button="Add new hotel" open={open}><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{data.map((h,i)=><article key={h.slug} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="h-32 bg-slate-100 bg-cover bg-center" style={{backgroundImage:`url('${h.image}')`}}/><div className={`h-1.5 ${["bg-blue-600","bg-sky-500","bg-indigo-500","bg-cyan-500"][i%4]}`}/><div className="p-5"><div className="flex justify-between gap-3"><span className="grid h-12 w-12 place-items-center rounded-xl bg-blue-50 text-blue-600"><Icon name="hotel"/></span><Status value={h.status}/></div><h3 className="mt-4 text-lg font-bold">{h.name}</h3><p className="text-sm text-slate-400">{h.location}, Nepal</p><div className="mt-5 grid grid-cols-2 divide-x divide-slate-100 rounded-xl bg-slate-50 py-3 text-center"><span><b className="block">{h.rooms}</b><small className="text-slate-400">Rooms</small></span><span><b className="block">{h.occupied}</b><small className="text-slate-400">Occupied</small></span></div><div className="mt-4 flex items-center justify-between"><b className="text-blue-600">NPR {h.price.toLocaleString()}<small className="font-normal text-slate-400"> /night</small></b><div className="flex gap-2"><button onClick={()=>edit(h)} className="rounded-lg border border-blue-200 px-3 py-2 text-xs font-bold text-blue-600 hover:bg-blue-50">Edit</button><button onClick={()=>remove(h)} aria-label={`Delete ${h.name}`} className="grid h-9 w-9 place-items-center rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50"><Icon name="trash" className="h-4 w-4"/></button></div></div></div></article>)}</div></SectionWrap> }
function Bookings({data}:{data:typeof bookings;open:()=>void}) {
  const [managedBookings,setManagedBookings]=useState(data);
  const changeStatus=(id:string,status:string)=>setManagedBookings(current=>current.map(booking=>booking.id===id?{...booking,status}:booking));
  const summaries=[
    {label:"Pending",tone:"border-amber-200 bg-amber-50 text-amber-700"},
    {label:"Confirmed",tone:"border-emerald-200 bg-emerald-50 text-emerald-700"},
    {label:"Checked in",tone:"border-blue-200 bg-blue-50 text-blue-700"},
    {label:"Completed",tone:"border-indigo-200 bg-indigo-50 text-indigo-700"},
    {label:"Cancelled",tone:"border-rose-200 bg-rose-50 text-rose-700"},
  ];
  return <SectionWrap title="Booking management" subtitle="Track and manage all guest reservations">
    <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {summaries.map(summary=><article key={summary.label} className={`rounded-2xl border p-4 ${summary.tone}`}><div className="flex items-center justify-between"><span className="text-sm font-semibold">{summary.label}</span><span className="h-2.5 w-2.5 rounded-full bg-current opacity-70"/></div><p className="mt-3 text-3xl font-extrabold">{managedBookings.filter(booking=>booking.status===summary.label).length}</p><p className="mt-1 text-xs opacity-70">Bookings</p></article>)}
    </div>
    <TableCard title={`${managedBookings.length} total bookings`}><BookingRows data={managedBookings} onStatusChange={changeStatus}/></TableCard>
  </SectionWrap>
}
function Users() {
  const [query,setQuery]=useState("");
  const [selectedUser,setSelectedUser]=useState<(typeof registeredUsers)[number]|null>(null);
  const visibleUsers=registeredUsers.filter(user=>`${user.id} ${user.name} ${user.email} ${user.phone} ${user.location}`.toLowerCase().includes(query.toLowerCase()));
  return <SectionWrap title="Registered users" subtitle="View all users registered with TravelNest">
    <div className="mb-5 flex max-w-md items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-400 shadow-sm">
      <Icon name="search" className="h-5 w-5"/>
      <input value={query} onChange={event=>setQuery(event.target.value)} placeholder="Search by name, email or phone..." className="w-full bg-transparent text-sm text-slate-700 outline-none"/>
    </div>
    <TableCard title={`${visibleUsers.length} registered users`}>
      <table className="w-full min-w-[1000px] text-left text-sm">
        <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-400"><tr>{["User ID","Full name","Email address","Phone number","Location","Registered on","Bookings","Details"].map(x=><th className="px-5 py-3 font-semibold" key={x}>{x}</th>)}</tr></thead>
        <tbody className="divide-y divide-slate-100">{visibleUsers.map(user=><tr key={user.id} className="hover:bg-blue-50/30"><td className="px-5 py-4 font-bold text-blue-600">{user.id}</td><td className="px-5 py-4"><span className="flex items-center gap-3"><i className="grid h-9 w-9 place-items-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">{user.name.split(" ").map(part=>part[0]).join("")}</i><b className="font-semibold">{user.name}</b></span></td><td className="px-5 py-4 text-slate-500">{user.email}</td><td className="px-5 py-4 text-slate-500">{user.phone}</td><td className="px-5 py-4 text-slate-500">{user.location}</td><td className="px-5 py-4 text-slate-500">{user.joined}</td><td className="px-5 py-4 text-center font-semibold">{user.bookings}</td><td className="px-5 py-4"><button onClick={()=>setSelectedUser(user)} aria-label={`View ${user.name} details`} className="grid h-9 w-9 place-items-center rounded-lg border border-blue-200 text-blue-600 transition hover:bg-blue-600 hover:text-white"><Icon name="eye" className="h-4 w-4"/></button></td></tr>)}</tbody>
      </table>
      {visibleUsers.length===0&&<p className="py-10 text-center text-sm text-slate-400">No registered users found.</p>}
    </TableCard>
    {selectedUser&&<UserDetails user={selectedUser} close={()=>setSelectedUser(null)}/>}
  </SectionWrap>
}

function UserDetails({user,close}:{user:(typeof registeredUsers)[number];close:()=>void}) {
  const history=bookings.slice(0,Math.min(user.bookings,3)).map((booking,index)=>({...booking,id:`#${user.id.replace("USR-","TN-")}${index+1}`,guest:user.name,status:index===0?"Pending":index===1?"Confirmed":"Completed"}));
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
    <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-100 p-6"><div><h3 className="text-xl font-bold">User details</h3><p className="text-sm text-slate-400">{user.id}</p></div><button onClick={close} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><Icon name="close"/></button></div>
      <div className="p-6">
        <div className="flex flex-col gap-5 rounded-2xl bg-blue-50 p-5 sm:flex-row sm:items-center"><span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-blue-600 text-xl font-bold text-white">{user.name.split(" ").map(part=>part[0]).join("")}</span><div><h4 className="text-xl font-bold">{user.name}</h4><p className="mt-1 text-sm text-slate-500">{user.email} · {user.phone}</p><p className="mt-1 text-sm text-slate-500">{user.location}, Nepal · Joined {user.joined}</p></div><div className="sm:ml-auto sm:text-right"><b className="text-2xl text-blue-600">{user.bookings}</b><p className="text-xs text-slate-400">Total bookings</p></div></div>
        <h4 className="mt-7 font-bold">Booking history</h4>
        {history.length?<div className="mt-3 space-y-3">{history.map(item=><article key={item.id} className="flex flex-col justify-between gap-3 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center"><div><p className="text-xs font-bold text-blue-600">{item.id}</p><h5 className="mt-1 font-semibold">{item.hotel}</h5><p className="text-xs text-slate-400">{item.dates}</p></div><div className="sm:text-right"><p className="font-bold">{item.amount}</p><div className="mt-1"><Status value={item.status}/></div></div></article>)}</div>:<p className="mt-3 rounded-xl bg-slate-50 p-5 text-sm text-slate-400">This user has no bookings yet.</p>}
      </div>
    </div>
  </div>
}
function Reviews() { return <SectionWrap title="Guest reviews" subtitle="Monitor ratings and respond to guest feedback"><div className="grid gap-5 lg:grid-cols-[.7fr_1.3fr]"><article className="rounded-2xl bg-blue-600 p-7 text-white"><p className="text-sm text-blue-100">Overall rating</p><p className="mt-3 text-5xl font-black">4.8</p><p className="mt-2 text-amber-300">★★★★★</p><p className="mt-2 text-xs text-blue-100">Based on 1,248 verified reviews</p></article><div className="space-y-3">{["Amazing stay and beautiful mountain views!|Aarav Sharma|5","Very helpful staff and clean rooms.|Sofia Martinez|5","The location was perfect for our trek.|Liam Wilson|4"].map(x=>{const [r,n,s]=x.split("|");return <article key={n} className="rounded-2xl border border-slate-200 bg-white p-5"><div className="flex justify-between"><b>{n}</b><span className="text-amber-400">{"★".repeat(+s)}</span></div><p className="mt-2 text-sm text-slate-500">{r}</p><button className="mt-3 text-xs font-bold text-blue-600">Reply to review</button></article>})}</div></div></SectionWrap> }
function Payments() { return <SectionWrap title="Payments & payouts" subtitle="Track revenue, transactions and property payouts"><div className="mb-5 grid gap-4 sm:grid-cols-3">{[["Gross revenue","NPR 2,480,500"],["Pending payouts","NPR 184,200"],["Platform fees","NPR 248,050"]].map(x=><div key={x[0]} className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-sm text-slate-400">{x[0]}</p><p className="mt-2 text-2xl font-bold">{x[1]}</p></div>)}</div><TableCard title="Recent transactions"><BookingRows data={bookings.slice(0,4)}/></TableCard></SectionWrap> }
function Settings({save}:{save:()=>void}) { return <SectionWrap title="Settings" subtitle="Manage your admin profile and platform preferences"><div className="grid gap-5 lg:grid-cols-2"><SettingsCard title="Profile information" save={save}/><SettingsCard title="Platform preferences" save={save}/></div></SectionWrap> }
function SettingsCard({title,save}:{title:string;save:()=>void}) { return <article className="rounded-2xl border border-slate-200 bg-white p-6"><h3 className="font-bold">{title}</h3><div className="mt-5 space-y-4">{["Display name","Email address","Phone number"].map((x,i)=><label key={x} className="block text-xs font-semibold text-slate-500">{x}<input defaultValue={["Rohit Sharma","admin@travelnest.com","+977 9800000000"][i]} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"/></label>)}</div><button onClick={save} className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white">Save changes</button></article> }
function SectionWrap({title,subtitle,button,open,children}:{title:string;subtitle:string;button?:string;open?:()=>void;children:React.ReactNode}) { return <div className="mx-auto max-w-[1500px]"><div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><h2 className="text-2xl font-extrabold">{title}</h2><p className="mt-1 text-sm text-slate-500">{subtitle}</p></div>{button&&<button onClick={open} className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white"><Icon name="plus" className="h-4 w-4"/>{button}</button>}</div>{children}</div> }
function Modal({type,close,save,publishHotel,initialHotel}:{type:"hotel"|"booking";close:()=>void;save:()=>void;publishHotel:(hotel:HotelRecord,originalSlug?:string)=>void;initialHotel:HotelRecord|null}) {
  const [form,setForm]=useState({
    name:initialHotel?.name??"",
    location:initialHotel?.location??"",
    price:initialHotel?.price.toString()??"",
    rooms:initialHotel?.rooms.toString()??"",
    image:initialHotel?.image??"",
    description:initialHotel?.description??"",
    amenities:initialHotel?.amenities.join(", ")??"",
    highlights:initialHotel?.highlights.join(", ")??"",
    extras:initialHotel?.extras.join(", ")??"",
  });
  const [error,setError]=useState("");
  const update=(field:keyof typeof form,value:string)=>setForm(current=>({...current,[field]:value}));
  const publish=()=>{
    if(!form.name.trim()||!form.location.trim()||!form.price||!form.rooms||!form.image.trim()||!form.description.trim()){
      setError("Complete all required property information before publishing.");
      return;
    }
    publishHotel({
      slug:createHotelSlug(form.name),
      name:form.name.trim(),
      location:form.location.trim(),
      price:Number(form.price),
      rooms:Number(form.rooms),
      occupied:0,
      image:form.image.trim(),
      description:form.description.trim(),
      amenities:form.amenities.split(",").map(item=>item.trim()).filter(Boolean),
      highlights:form.highlights.split(",").map(item=>item.trim()).filter(Boolean),
      extras:form.extras.split(",").map(item=>item.trim()).filter(Boolean),
      status:initialHotel?.status??"Active",
    },initialHotel?.slug);
  };
  const fieldClass="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50";
  return <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/55 p-4 backdrop-blur-sm"><div className="max-h-[94vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-[#f8fafc] shadow-2xl">
    <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-blue-600">Property publisher</p><h3 className="mt-1 text-2xl font-extrabold">{type==="hotel"?(initialHotel?"Edit hotel information":"Create a new hotel"):"Create booking"}</h3></div><button onClick={close} className="rounded-xl border border-slate-200 p-2.5 text-slate-500 hover:bg-slate-50"><Icon name="close"/></button></div>
    {type==="hotel"?<div className="grid gap-6 p-6 lg:grid-cols-[1fr_300px]">
      <div className="space-y-5">
        <section className="rounded-2xl border border-slate-200 bg-white p-5"><h4 className="font-bold">Basic information</h4><p className="mt-1 text-xs text-slate-400">This appears on the user hotel listing.</p><div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="text-xs font-semibold text-slate-600">Hotel name *<input value={form.name} onChange={e=>update("name",e.target.value)} placeholder="Himalayan Paradise Resort" className={fieldClass}/></label>
          <label className="text-xs font-semibold text-slate-600">Location *<input value={form.location} onChange={e=>update("location",e.target.value)} placeholder="Pokhara" className={fieldClass}/></label>
          <label className="text-xs font-semibold text-slate-600">Price per night (NPR) *<input value={form.price} onChange={e=>update("price",e.target.value)} type="number" min="1" placeholder="8500" className={fieldClass}/></label>
          <label className="text-xs font-semibold text-slate-600">Total rooms *<input value={form.rooms} onChange={e=>update("rooms",e.target.value)} type="number" min="1" placeholder="42" className={fieldClass}/></label>
        </div></section>
        <section className="rounded-2xl border border-slate-200 bg-white p-5"><h4 className="font-bold">Hotel details</h4><p className="mt-1 text-xs text-slate-400">This content appears on the property details page.</p><div className="mt-4 space-y-4">
          <label className="block text-xs font-semibold text-slate-600">About this property *<textarea value={form.description} onChange={e=>update("description",e.target.value)} rows={3} placeholder="Describe the hotel, atmosphere and experience" className={`${fieldClass} resize-none`}/></label>
          <label className="block text-xs font-semibold text-slate-600">Amenities & services<input value={form.amenities} onChange={e=>update("amenities",e.target.value)} placeholder="Free WiFi, Pool, Parking, Restaurant" className={fieldClass}/><small className="mt-1.5 block font-normal text-slate-400">Separate each item with a comma.</small></label>
          <label className="block text-xs font-semibold text-slate-600">Booking highlights<input value={form.highlights} onChange={e=>update("highlights",e.target.value)} placeholder="Free cancellation, Pay at property, Instant confirmation" className={fieldClass}/></label>
          <label className="block text-xs font-semibold text-slate-600">Additional information<input value={form.extras} onChange={e=>update("extras",e.target.value)} placeholder="Flexible dates, All group sizes welcome" className={fieldClass}/></label>
        </div></section>
      </div>
      <aside className="space-y-5"><section className="rounded-2xl border border-slate-200 bg-white p-5"><h4 className="font-bold">Cover image</h4><div className="mt-4 h-40 overflow-hidden rounded-xl bg-blue-50">{form.image?<div className="h-full bg-cover bg-center" style={{backgroundImage:`url('${form.image}')`}}/>:<div className="grid h-full place-items-center text-center text-blue-300"><span><Icon name="hotel" className="mx-auto h-8 w-8"/><small className="mt-2 block">Image preview</small></span></div>}</div><label className="mt-4 block text-xs font-semibold text-slate-600">Image URL *<input value={form.image} onChange={e=>update("image",e.target.value)} placeholder="https://..." className={fieldClass}/></label></section>
      </aside>
    </div>:<div className="p-6"><button onClick={save}>Save booking</button></div>}
    <div className="sticky bottom-0 flex flex-col gap-3 border-t border-slate-200 bg-white px-6 py-4 sm:flex-row sm:items-center"><p className="text-sm font-medium text-rose-600">{error}</p><div className="flex gap-3 sm:ml-auto"><button onClick={close} className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold">Cancel</button><button onClick={publish} className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 hover:bg-blue-700">{initialHotel?"Save changes":"Publish hotel"}</button></div></div>
  </div></div>
}
