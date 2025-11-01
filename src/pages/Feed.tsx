import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import type { User } from "@supabase/supabase-js";

const Feed = () => {
  const [user, setUser] = useState<User | null>(null);
  const [newPost, setNewPost] = useState("");
  const queryClient = useQueryClient();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
  }, []);

  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles:user_id (username, avatar_url),
          likes (id, user_id),
          comments (id)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const createPostMutation = useMutation({
    mutationFn: async (content: string) => {
      if (!user) throw new Error("Você precisa estar logado");
      
      const { data, error } = await supabase
        .from('posts')
        .insert([{ user_id: user.id, content }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setNewPost("");
      toast.success("Post criado!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Erro ao criar post");
    }
  });

  const toggleLikeMutation = useMutation({
    mutationFn: async (postId: string) => {
      if (!user) throw new Error("Você precisa estar logado");
      
      const { data: existingLike } = await supabase
        .from('likes')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', user.id)
        .single();
      
      if (existingLike) {
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('id', existingLike.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('likes')
          .insert([{ post_id: postId, user_id: user.id }]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    createPostMutation.mutate(newPost);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container py-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">Feed Social</h1>

        {user && (
          <Card className="mb-8">
            <CardHeader>
              <h2 className="text-lg font-semibold">Criar Post</h2>
            </CardHeader>
            <form onSubmit={handleCreatePost}>
              <CardContent>
                <Textarea
                  placeholder="Compartilhe suas dicas de moda..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  rows={3}
                />
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  disabled={createPostMutation.isPending || !newPost.trim()}
                >
                  {createPostMutation.isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Publicar
                </Button>
              </CardFooter>
            </form>
          </Card>
        )}

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : !posts || posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Nenhum post ainda. Seja a primeira a compartilhar!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post: any) => {
              const isLiked = post.likes?.some((like: any) => like.user_id === user?.id);
              const likesCount = post.likes?.length || 0;
              const commentsCount = post.comments?.length || 0;
              const profile = post.profiles;

              return (
                <Card key={post.id}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={profile?.avatar_url} />
                        <AvatarFallback>
                          {profile?.username?.[0]?.toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{profile?.username || 'Usuário'}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(post.created_at).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="whitespace-pre-wrap">{post.content}</p>
                  </CardContent>
                  
                  <CardFooter className="flex gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => user && toggleLikeMutation.mutate(post.id)}
                      disabled={!user}
                      className="gap-2"
                    >
                      <Heart 
                        className={`h-4 w-4 ${isLiked ? 'fill-primary text-primary' : ''}`} 
                      />
                      {likesCount}
                    </Button>
                    
                    <Button variant="ghost" size="sm" className="gap-2">
                      <MessageCircle className="h-4 w-4" />
                      {commentsCount}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;