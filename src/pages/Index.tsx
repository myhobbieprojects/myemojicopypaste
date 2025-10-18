import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { emojiCategories } from "@/data/emojis";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { copyToClipboard, copiedText } = useCopyToClipboard();

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return emojiCategories;
    
    const query = searchQuery.toLowerCase();
    return emojiCategories
      .map(category => ({
        ...category,
        emojis: category.emojis.filter(emoji => 
          category.name.toLowerCase().includes(query)
        )
      }))
      .filter(category => category.emojis.length > 0);
  }, [searchQuery]);

  const handleCopyEmoji = async (emoji: string) => {
    const success = await copyToClipboard(emoji);
    if (success) {
      toast.success(`Copied ${emoji} to clipboard!`);
    } else {
      toast.error("Failed to copy emoji");
    }
  };

  return (
    <>
      <title>Emoji Copy Paste - All Emojis 😀 Copy & Paste Collection</title>
      <meta name="description" content="Copy and paste emojis instantly! Browse over 3,700+ emojis including smileys, animals, food, flags and more. Click any emoji to copy it to your clipboard." />
      <meta name="keywords" content="emoji, copy paste emoji, emoji list, all emojis, emoji keyboard, emoji symbols, free emojis" />
      
      <div className="min-h-screen bg-background">
        {/* Top ad space */}
        <div className="h-24 w-full" />

        <div className="flex">
          {/* Left ad space */}
          <div className="hidden lg:block w-40 flex-shrink-0" />

          {/* Main content */}
          <main className="flex-1 max-w-7xl mx-auto px-4 py-8">
            <header className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Emoji Copy & Paste
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Browse and copy over 3,700+ emojis instantly. Click any emoji to copy it to your clipboard.
              </p>
              
              <div className="max-w-2xl mx-auto relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search emojis or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-lg"
                />
              </div>
            </header>

            <section className="space-y-12">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                  <article key={category.name} className="scroll-mt-24">
                    <h2 className="text-3xl font-bold mb-6 text-foreground">
                      {category.name}
                    </h2>
                    <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-14 gap-2">
                      {category.emojis.map((emoji, index) => (
                        <button
                          key={`${emoji}-${index}`}
                          onClick={() => handleCopyEmoji(emoji)}
                          className={`
                            text-4xl p-4 rounded-lg 
                            transition-all duration-200 
                            hover:scale-110 hover:bg-accent
                            active:scale-95
                            ${copiedText === emoji ? 'bg-primary/20 scale-110' : 'bg-card'}
                            focus:outline-none focus:ring-2 focus:ring-ring
                          `}
                          title={`Click to copy ${emoji}`}
                          aria-label={`Copy ${emoji} emoji`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </article>
                ))
              ) : (
                <div className="text-center py-16">
                  <p className="text-2xl text-muted-foreground">
                    No emojis found. Try a different search term.
                  </p>
                </div>
              )}
            </section>

            <footer className="mt-16 pb-8 text-center border-t pt-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">About Emoji Copy Paste</h2>
                <p className="text-muted-foreground max-w-3xl mx-auto">
                  Welcome to the most comprehensive emoji copy and paste tool on the web! Our collection includes every emoji from the Unicode standard, 
                  organized into easy-to-browse categories. Simply click any emoji to instantly copy it to your clipboard, then paste it wherever you need - 
                  social media, messages, emails, documents, and more.
                </p>
                <p className="text-muted-foreground max-w-3xl mx-auto">
                  From classic smileys 😀 and hearts ❤️ to animals 🐶, food 🍕, travel 🚀, activities 🎉, and country flags 🇺🇸, 
                  we've got you covered. All emojis work on iPhone, Android, Windows, Mac, and web browsers. No downloads or installations required!
                </p>
              </div>
            </footer>
          </main>

          {/* Right ad space */}
          <div className="hidden lg:block w-40 flex-shrink-0" />
        </div>
      </div>
    </>
  );
};

export default Index;
