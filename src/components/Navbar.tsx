import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { CartDrawer } from "./CartDrawer";
import { User, LogOut, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export const Navbar = () => {
  const location = useLocation();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-gradient-primary">Exageros da Ving</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link to="/shop">
            <Button 
              variant={isActive("/shop") ? "default" : "ghost"}
              size="sm"
            >
              Loja
            </Button>
          </Link>
          <Link to="/feed">
            <Button 
              variant={isActive("/feed") ? "default" : "ghost"}
              size="sm"
            >
              Feed
            </Button>
          </Link>
          <Link to="/look-creator">
            <Button 
              variant={isActive("/look-creator") ? "default" : "ghost"}
              size="sm"
            >
              Criar Look
            </Button>
          </Link>
          <Link to="/about">
            <Button 
              variant={isActive("/about") ? "default" : "ghost"}
              size="sm"
            >
              Sobre
            </Button>
          </Link>
          
          <CartDrawer />
          
          {user ? (
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          ) : (
            <Link to="/auth">
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                Entrar
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};