import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const LookCreator = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImages(prev => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSave = () => {
    if (!title.trim()) {
      toast.error("Adicione um título para o seu look");
      return;
    }
    if (images.length === 0) {
      toast.error("Adicione pelo menos uma imagem");
      return;
    }
    toast.success("Look salvo! (Funcionalidade completa em breve)");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Look Creator</h1>
          <p className="text-muted-foreground mb-8">
            Monte combinações incríveis e compartilhe com a comunidade
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Upload Area */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Suas Imagens</h2>
              
              <div className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground mb-4">
                    Faça upload de fotos de roupas ou suas selfies
                  </p>
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <Button asChild variant="outline">
                    <label htmlFor="image-upload" className="cursor-pointer">
                      Selecionar Imagens
                    </label>
                  </Button>
                </div>

                {images.length > 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    {images.map((img, idx) => (
                      <div key={idx} className="aspect-square rounded-lg overflow-hidden bg-secondary/20">
                        <img 
                          src={img} 
                          alt={`Look ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>

            {/* Details */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Detalhes do Look</h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    placeholder="Ex: Look casual de inverno"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva seu look, as peças usadas..."
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <Button 
                  onClick={handleSave} 
                  className="w-full gap-2"
                  disabled={!title.trim() || images.length === 0}
                >
                  <Save className="h-4 w-4" />
                  Salvar Look
                </Button>
              </div>
            </Card>
          </div>

          {/* Info */}
          <Card className="mt-8 p-6 bg-secondary/20">
            <h3 className="font-semibold mb-2">Como funciona?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Faça upload de fotos suas para "experimentar" as roupas virtualmente</li>
              <li>• Combine peças da nossa loja ou suas próprias roupas</li>
              <li>• Salve seus looks favoritos e compartilhe no feed</li>
              <li>• Inspire-se e inspire outras fashionistas!</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LookCreator;