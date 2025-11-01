import { Navbar } from "@/components/Navbar";
import { useQuery } from "@tanstack/react-query";
import { storefrontApiRequest, STOREFRONT_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

const Shop = () => {
  const addItem = useCartStore(state => state.addItem);
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['shopify-products'],
    queryFn: async () => {
      const response = await storefrontApiRequest(STOREFRONT_QUERY, { first: 20 });
      return response?.data?.products?.edges as ShopifyProduct[];
    }
  });

  const handleAddToCart = (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0].node;
    addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions
    });
    toast.success("Adicionado ao carrinho!", {
      position: "top-center"
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-20 flex justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-20 text-center">
          <p className="text-destructive">Erro ao carregar produtos</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="container py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Nossa Coleção</h1>
          <p className="text-muted-foreground">
            Peças únicas de brechó, selecionadas com carinho
          </p>
        </div>

        {!data || data.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Nenhum produto encontrado</h2>
            <p className="text-muted-foreground">
              Em breve teremos produtos incríveis para você!
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.map((product) => {
              const { node } = product;
              const image = node.images.edges[0]?.node;
              const price = node.priceRange.minVariantPrice;

              return (
                <Card key={node.id} className="group overflow-hidden shadow-card hover:shadow-elegant transition-smooth">
                  <Link to={`/product/${node.handle}`}>
                    <div className="aspect-square overflow-hidden bg-secondary/20">
                      {image ? (
                        <img
                          src={image.url}
                          alt={image.altText || node.title}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center">
                          <ShoppingCart className="h-12 w-12 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  </Link>
                  
                  <CardContent className="p-4">
                    <Link to={`/product/${node.handle}`}>
                      <h3 className="font-semibold mb-1 line-clamp-1 hover:text-primary transition-colors">
                        {node.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {node.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">
                        {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
                      </span>
                      <Button
                        size="sm"
                        onClick={() => handleAddToCart(product)}
                        className="gap-2"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Adicionar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default Shop;