import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, ShoppingBag, Heart, Palette } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="container py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-5xl md:text-7xl font-bold">
            Exageros da <span className="text-gradient-primary">Ving</span>
          </h1>
          <p className="mb-8 text-xl text-muted-foreground">
            Brechó exclusivo de roupas usadas para mulheres que amam estilo, 
            sustentabilidade e peças únicas. Monte seus looks, compartilhe e inspire!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/shop">
              <Button size="lg" className="gap-2">
                <ShoppingBag className="h-5 w-5" />
                Explorar Loja
              </Button>
            </Link>
            <Link to="/look-creator">
              <Button size="lg" variant="outline" className="gap-2">
                <Palette className="h-5 w-5" />
                Criar Look
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container py-16">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-6 shadow-card transition-smooth hover:shadow-elegant">
            <ShoppingBag className="mb-4 h-12 w-12 text-primary" />
            <h3 className="mb-2 text-xl font-semibold">Brechó Online</h3>
            <p className="text-muted-foreground">
              Roupas usadas selecionadas com carinho. Qualidade, estilo e preços acessíveis.
            </p>
          </div>
          
          <div className="rounded-lg border bg-card p-6 shadow-card transition-smooth hover:shadow-elegant">
            <Palette className="mb-4 h-12 w-12 text-accent" />
            <h3 className="mb-2 text-xl font-semibold">Look Creator</h3>
            <p className="text-muted-foreground">
              Monte combinações incríveis com suas próprias fotos ou peças da loja.
            </p>
          </div>
          
          <div className="rounded-lg border bg-card p-6 shadow-card transition-smooth hover:shadow-elegant">
            <Heart className="mb-4 h-12 w-12 text-primary" />
            <h3 className="mb-2 text-xl font-semibold">Comunidade</h3>
            <p className="text-muted-foreground">
              Compartilhe looks, curta, comente e inspire-se com outras fashionistas.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-20">
        <div className="rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 p-12 text-center">
          <Sparkles className="mx-auto mb-4 h-16 w-16 text-primary" />
          <h2 className="mb-4 text-3xl font-bold">Pronta para começar?</h2>
          <p className="mb-6 text-lg text-muted-foreground">
            Crie sua conta e descubra um mundo de possibilidades fashion!
          </p>
          <Link to="/auth">
            <Button size="lg">Criar Conta Grátis</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
