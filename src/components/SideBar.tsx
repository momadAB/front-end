"use client";
import { logout } from "@/app/api/actions/auth";
import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState, ReactNode } from "react";

interface SidebarContextProps {
  expanded: boolean;
}

const SidebarContext = createContext<SidebarContextProps>({ expanded: true });

// const SidebarContext = createContext();

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-gradient-to-b from-[#6773b3] via-[#08111f] to-[#0e46d3] border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <div className={`${expanded ? "2xl:text-[26px] w-32" : "w-0"}`}>
            <img
              src={"logo.svg"}
              alt="logo"
              className="w-10 h-10 object-contain"
            />
            <h1
              className={`overflow-hidden transition-all text-[#1c2a41] font-['Times New Roman'] text-2xl font-bold `}
            >
              Liwan
            </h1>
          </div>

          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <button type="button" onClick={logout}>
                <img src={"power-off.png"} width={20} height={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
}

interface SidebarItemProps {
  icon: ReactNode;
  text: string;
  active?: boolean;
  alert?: boolean;
}

export function SidebarItem({
  icon,
  text,
  active = false,
  alert = false,
}: SidebarItemProps) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      className={` text-white
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  );
}
