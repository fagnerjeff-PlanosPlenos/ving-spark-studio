import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Sparkles, Heart, Leaf, Users } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Sobre <span className="text-gradient-primary">Exageros da Ving</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Muito mais do que um brechó. Uma comunidade de moda sustentável.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 mb-12">
            <Card className="p-6">
              <Leaf className="h-12 w-12 text-primary mb-4" />
              <h2 className="text-2xl font-semibold mb-3">Sustentabilidade</h2>
              <p className="text-muted-foreground">
                Acreditamos na moda circular. Cada peça vendida é uma peça que ganha nova vida, 
                reduzindo o impacto ambiental e promovendo consumo consciente.
              </p>
            </Card>

            <Card className="p-6">
              <Heart className="h-12 w-12 text-accent mb-4" />
              <h2 className="text-2xl font-semibold mb-3">Qualidade</h2>
              <p className="text-muted-foreground">
                Selecionamos cuidadosamente cada peça. Roupas usadas em ótimo estado, 
                com muito estilo e histórias para contar.
              </p>
            </Card>

            <Card className="p-6">
              <Sparkles className="h-12 w-12 text-primary mb-4" />
              <h2 className="text-2xl font-semibold mb-3">Estilo Único</h2>
              <p className="text-muted-foreground">
                Peças exclusivas que você não encontrará em fast fashion. 
                Seja única, seja autêntica, seja você mesma.
              </p>
            </Card>

            <Card className="p-6">
              <Users className="h-12 w-12 text-accent mb-4" />
              <h2 className="text-2xl font-semibold mb-3">Comunidade</h2>
              <p className="text-muted-foreground">
                Mais do que vender roupas, criamos uma comunidade onde mulheres 
                compartilham estilo, inspiração e apoio mútuo.
              </p>
            </Card>
          </div>

          <Card className="p-8 bg-gradient-to-r from-primary/10 to-accent/10">
            <h2 className="text-3xl font-bold mb-4 text-center">Nossa História</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                O Exageros da Ving nasceu do amor pela moda e pela sustentabilidade. 
                Acreditamos que cada roupa tem uma história e merece ser valorizada.
              </p>
              <p>
                Nosso brechó é especializado em roupas femininas usadas, cuidadosamente 
                selecionadas para mulheres que amam estilo, qualidade e preços justos.
              </p>
              <p>
                Além de vender roupas, criamos ferramentas como o Look Creator para você 
                experimentar combinações e compartilhar seu estilo com a comunidade.
              </p>
              <p className="font-semibold text-foreground">
                Junte-se a nós nessa jornada de moda consciente e cheia de estilo! 💚
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;