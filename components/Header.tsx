"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createClientBrowser } from "@/lib/supabase/client";
import { LogIn, LogOut, Sparkles, Mail } from "lucide-react";

export default function Header() {
     const supabase = createClientBrowser();
     const [loading, setLoading] = useState(false);
     const [session, setSession] = useState<any>(null);
     const [showEmailInput, setShowEmailInput] = useState(false);
     const [email, setEmail] = useState("");

     // fetch session once on mount
     useEffect(() => {
          supabase.auth
               .getSession()
               .then(({ data }) => setSession(data.session));

          const {
               data: { subscription },
          } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));

          return () => subscription.unsubscribe();
     }, [supabase.auth]);

     const signInWithEmail = async (e: React.FormEvent) => {
          e.preventDefault();
          if (!email) return;

          setLoading(true);
          try {
               const { error } = await supabase.auth.signInWithOtp({
                    email,
                    options: {
                         emailRedirectTo: `${window.location.origin}/auth/callback`,
                    },
               });
               if (error) throw error;
               alert("Check your email for the login link!");
               setShowEmailInput(false);
               setEmail("");
          } catch (e) {
               alert((e as Error).message);
          } finally {
               setLoading(false);
          }
     };

     const signOut = async () => {
          await supabase.auth.signOut();
          setSession(null);
     };

     return (
          <header className="border-b border-white/10 backdrop-blur sticky top-0 z-50">
               <div className="container py-4 flex items-center gap-4 justify-between">
                    <Link
                         href="/"
                         className="flex items-center gap-2 font-semibold"
                    >
                         <Sparkles className="h-5 w-5" />
                         <span>
                              {process.env.NEXT_PUBLIC_APP_NAME ||
                                   "Cosmic Event Tracker"}
                         </span>
                    </Link>
                    <nav className="flex items-center gap-3">
                         <Link
                              href="/compare"
                              className="px-3 py-2 rounded-xl bg-brand hover:bg-brand-dark transition"
                         >
                              Compare
                         </Link>
                         {session ? (
                              <div className="flex items-center gap-3">
                                   <span className="text-sm text-gray-400">
                                        {session.user?.email || "User"}
                                   </span>
                                   <button
                                        onClick={signOut}
                                        className="px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 transition flex items-center gap-2"
                                   >
                                        <LogOut className="h-4 w-4" /> Logout
                                   </button>
                              </div>
                         ) : (
                              <div className="relative flex items-center gap-2">
                                   {showEmailInput ? (
                                        <form
                                             onSubmit={signInWithEmail}
                                             className="flex items-center gap-2"
                                        >
                                             <input
                                                  type="email"
                                                  placeholder="Enter your email"
                                                  value={email}
                                                  onChange={(e) =>
                                                       setEmail(e.target.value)
                                                  }
                                                  className="px-3 py-2 rounded-xl bg-neutral-800 border border-neutral-700 text-white placeholder-gray-400 focus:outline-none focus:border-brand"
                                                  required
                                                  disabled={loading}
                                             />
                                             <button
                                                  type="submit"
                                                  disabled={loading || !email}
                                                  className="px-3 py-2 rounded-xl bg-brand hover:bg-brand-dark transition flex items-center gap-2 disabled:opacity-50"
                                             >
                                                  <Mail className="h-4 w-4" />
                                                  {loading
                                                       ? "Sending..."
                                                       : "Send Link"}
                                             </button>
                                             <button
                                                  type="button"
                                                  onClick={() =>
                                                       setShowEmailInput(false)
                                                  }
                                                  className="px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 transition"
                                             >
                                                  Cancel
                                             </button>
                                        </form>
                                   ) : (
                                        <>
                                             <button
                                                  onClick={() =>
                                                       setShowEmailInput(true)
                                                  }
                                                  className="px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 transition flex items-center gap-2"
                                             >
                                                  <Mail className="h-4 w-4" />{" "}
                                                  Email
                                             </button>
                                        </>
                                   )}
                              </div>
                         )}
                    </nav>
               </div>
          </header>
     );
}
