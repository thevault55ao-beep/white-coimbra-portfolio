import React, { useState, useEffect } from ‘react’;
import { Play, Mail, Instagram, ExternalLink, ChevronDown, Upload, Loader } from ‘lucide-react’;
import { createClient } from ‘@supabase/supabase-js’;

// Supabase configuration
const SUPABASE_URL = ‘https://rmilulycuojyplipxnwf.supabase.co’;
const SUPABASE_KEY = ‘eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtaWx1bHljdW9qeXBsaXB4bndmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxNDY1NTIsImV4cCI6MjA4ODcyMjU1Mn0.l7fRBOPdHMwk0Bvf543eZy-NG7SkOTQ8jbq9zeHusgs’;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default function PortfolioSite() {
const [scrolled, setScrolled] = useState(false);
const [photos, setPhotos] = useState({
‘Yola Semedo’: {},
‘Anafitah’: {},
‘Yara Nunes’: {},
});
const [loading, setLoading] = useState(true);
const [uploading, setUploading] = useState(false);

// Fetch photos from Supabase on mount
useEffect(() => {
const fetchPhotos = async () => {
try {
const { data, error } = await supabase
.from(‘portfolio_photos’)
.select(’*’);

```
    if (error) throw error;
    
    // Organize photos by artist
    const organized = {
      'Yola Semedo': {},
      'Anafitah': {},
      'Yara Nunes': {},
    };
    
    if (data) {
      data.forEach((photo) => {
        organized[photo.artist] = {
          ...organized[photo.artist],
          [photo.photo_number]: photo.photo_url,
        };
      });
    }
    
    setPhotos(organized);
  } catch (error) {
    console.error('Error fetching photos:', error);
  } finally {
    setLoading(false);
  }
};

fetchPhotos();
```

}, []);

useEffect(() => {
const handleScroll = () => setScrolled(window.scrollY > 50);
window.addEventListener(‘scroll’, handleScroll);
return () => window.removeEventListener(‘scroll’, handleScroll);
}, []);

const handlePhotoUpload = async (artist, photoIndex, e) => {
const file = e.target.files[0];
if (!file) return;

```
setUploading(true);

try {
  // Upload to Supabase Storage
  const timestamp = Date.now();
  const filename = `${artist.toLowerCase().replace(/\s+/g, '-')}-${photoIndex}-${timestamp}.jpg`;
  
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('portfolio-photos')
    .upload(filename, file);
  
  if (uploadError) throw uploadError;
  
  // Get public URL
  const { data: urlData } = supabase.storage
    .from('portfolio-photos')
    .getPublicUrl(filename);
  
  const photoUrl = urlData.publicUrl;
  
  // Save to database
  const { error: dbError } = await supabase
    .from('portfolio_photos')
    .upsert(
      {
        artist,
        photo_number: photoIndex,
        photo_url: photoUrl,
      },
      { onConflict: 'artist,photo_number' }
    );
  
  if (dbError) throw dbError;
  
  // Update local state
  setPhotos((prev) => ({
    ...prev,
    [artist]: {
      ...prev[artist],
      [photoIndex]: photoUrl,
    },
  }));
  
  alert(`Photo uploaded successfully!`);
} catch (error) {
  console.error('Error uploading photo:', error);
  alert('Error uploading photo. Please try again.');
} finally {
  setUploading(false);
}
```

};

const work = [
{
title: ‘Yola Semedo: Matriarca’,
category: ‘Creative Direction’,
image: ‘url(“https://images.unsplash.com/photo-1534737565826-75a84c7e79d9?w=800&h=600&fit=crop”)’,
description: ‘Fashion editorial featuring traditional Angolan Samakaka fabric crown’,
},
{
title: ‘Black Spygo: O Tempo Certo’,
category: ‘Visual Concept Album’,
image: ‘url(“https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop”)’,
description: ‘Conceptual album artwork with cohesive visual universe across 4 music videos’,
},
{
title: ‘Banco BAI: Sonho de C4 Pedro’,
category: ‘Creative Direction & Brand Activation’,
image: ‘url(“https://images.unsplash.com/photo-1516912481808-846ec9b29e85?w=800&h=600&fit=crop”)’,
description: ‘Large-scale entertainment event partnership and brand presence’,
},
{
title: ‘Etu Energias: Brand Strategy’,
category: ‘Creative Direction & Social Media Strategy’,
image: ‘url(“https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop”)’,
description: ‘Comprehensive social media strategy and brand positioning for market leadership’,
},
];

const clients = [
‘Banco BAI’,
‘BDA’,
‘Endiama’,
‘Etu Energias’,
‘Jetour’,
‘MegAfrica’,
‘Grupo Zahara’,
‘Africell’,
‘Afrimoney’,
];

const yolaMetrics = [
{ platform: ‘Instagram’, followers: ‘UPDATING’, engagement: ‘UPDATING’, period: ‘Download your metrics’ },
{ platform: ‘Facebook’, followers: ‘UPDATING’, engagement: ‘UPDATING’, period: ‘Download your metrics’ },
];

const videoTreatments = [
{
title: ‘Yola Semedo - Minha Sorte’,
role: ‘Creative Direction & Production’,
description: ‘Directed and produced: beach cinematography with ethereal movement’,
year: ‘2021’,
link: ‘https://youtu.be/Z-2Coze7wLg?si=M0ZrvyQg3O-i-Lot’,
},
{
title: ‘Yola Semedo - Maldita Distância’,
role: ‘Concept’,
description: ‘Narrative-driven story of urban resilience and connection across distance’,
year: ‘2020’,
link: ‘https://youtu.be/FuIcpc0duoQ?si=FJWyMDUJLkZ00aLK’,
},
{
title: ‘Black Spygo - Control ft. Chelsea Dinorath & Djodje’,
role: ‘Video Treatment’,
description: ‘1950s aesthetic diner and midnight car scenes’,
year: ‘2023’,
link: ‘https://youtu.be/7L5dP16V_Z8?si=*OG0L5Lral-RbPfG’,
},
{
title: ‘Black Spygo - Tarraxinha ft. CEF Tanzy’,
role: ‘Video Treatment’,
description: ‘Nightlife and urban storytelling with collaborative energy’,
year: ‘2024’,
link: ‘https://youtu.be/2vu7xweWpWQ?si=hFTGdAAIJfjMD4w0’,
},
{
title: ‘Black Spygo - No Tempo Certo ft. Altifridi’,
role: ‘Production’,
description: ‘Cinematic landscape cinematography exploring temporal themes’,
year: ‘2024’,
link: ‘https://youtu.be/2vu7xweWpWQ?si=hFTGdAAIJfjMD4w0’,
},
{
title: ‘Black Spygo - Grega ft. C4 Pedro & Bruna Amado’,
role: ‘Video Treatment’,
description: ‘Golden hour urban sequences with street narrative’,
year: ‘2024’,
link: ‘https://youtu.be/2YtccWxlUhE?si=ce2BPBITmz84AsgJ’,
},
{
title: ‘Black Spygo - Cama Vazia ft. Anna Joyce’,
role: ‘Video Treatment’,
description: ‘Cinematic bedroom drama with silhouettes and intimate storytelling’,
year: ‘2023’,
link: ‘https://youtu.be/iHsVuWd6hHw?si=umojpBXkdESIs4BS’,
},
{
title: ‘Black Spygo - Pólvora’,
role: ‘Creative Direction & Production’,
description: ‘Dramatic visual composition exploring intensity and movement’,
year: ‘2021’,
link: ‘https://youtu.be/0p4Sq9uAxV8?si=m2HvJOb5INmSGkpp’,
},
{
title: ‘Yola Semedo - Quem Dera’,
role: ‘Concept & Creative Direction’,
description: ‘Urban storytelling with lush botanical settings and bold color grading’,
year: ‘2025’,
link: ‘https://youtu.be/H_aniWehIYY?si=eFb0V96KTuSlaFQb’,
},
{
title: ‘Yola Semedo - Gaguejar’,
role: ‘Creative Direction’,
description: ‘Intimate vocal cover treatment with artistic restraint’,
year: ‘2025’,
link: ‘https://youtu.be/cejKkOBnzoE?si=n_ZK_h7FM7zgaR4N’,
},
{
title: ‘Biura - Se Mimar’,
role: ‘Production’,
description: ‘Colorful urban energy with playful visual language’,
year: ‘2021’,
link: ‘https://youtu.be/1rac5S0WL84?si=v9eaIBuPkIkosycj’,
},
{
title: ‘Biura - Pólvora’,
role: ‘Creative Direction & Production’,
description: ‘High-intensity rap visual with dramatic lighting and movement’,
year: ‘2021’,
link: ‘https://youtu.be/0p4Sq9uAxV8?si=v1O6Ue_3R-7lNp0p’,
},
{
title: ‘Biura - Bolacha de Nuvem’,
role: ‘Production’,
description: ‘Ethereal creative direction exploring dreamlike aesthetics’,
year: ‘2021’,
link: ’https://youtu.be/63qJPZEZysg?si=FEtJ0TwQPbcYQNe*’,
},
{
title: ‘Altifridi ft. C4 Pedro - Vai Dar Merda’,
role: ‘Direction & Production & Creative Direction’,
description: ‘Bold visual narrative with rich color palette and cinematic composition’,
year: ‘2021’,
link: ‘https://youtu.be/awNCcCB83Fk?si=cnMjsDRGlz56gH5H’,
},
{
title: ‘Liriany Castro - Magui’,
role: ‘Production’,
description: ‘Intimate relationship story with warm, domestic aesthetics’,
year: ‘2021’,
link: ‘https://youtu.be/JTW4OjK60u8?si=law7RXGgylYtiG65’,
},
{
title: ‘Liriany Castro - Fui a Outra’,
role: ‘Production’,
description: ‘Emotional narrative exploring complex relationships’,
year: ‘2021’,
link: ‘https://youtu.be/0dat7C28XcM?si=Ozsoc7YWN_JCAV84’,
},
{
title: ‘Liriany Castro - Choro da Alma’,
role: ‘Production & Creative Direction’,
description: ‘Deeply emotional visual treatment with atmospheric storytelling’,
year: ‘2021’,
link: ‘https://youtu.be/H4fKu0dFnQI?si=poA7FXsNcGl2LdrS’,
},
{
title: ‘Yara Nunes - Melhor Assim’,
role: ‘Creative Direction’,
description: ‘Refined vocal presentation with elegant visual framing’,
year: ‘2021’,
link: ‘https://youtu.be/0CXVMfOIKOc?si=4TgkQHZBtBr0jjia’,
},
{
title: ‘Heroide - Muloji’,
role: ‘Creative Direction’,
description: ‘Cultural narrative exploration with authentic visual language’,
year: ‘2021’,
link: ‘https://youtu.be/hKF5xzfvkQk?si=eNI1Brp49V955rSw’,
},
];

const photographyProjects = [
{
title: ‘Yola Semedo’,
role: ‘Creative Direction & Styling’,
photoCount: 7,
},
{
title: ‘Anafitah’,
role: ‘Creative Direction & Styling’,
photoCount: 4,
},
{
title: ‘Yara Nunes’,
role: ‘Creative Direction & Styling’,
photoCount: 4,
},
];

const blackSpygoAlbumConcept = {
title: ‘No Tempo Certo’,
year: ‘2024’,
concept: ‘Thematic Visual Universe’,
description: ‘Created the unified visual concept for Black Spygo's album exploring artistic and theatrical representations of time. The album features a cohesive color palette (red as central theme), timelapse and hyperlapse techniques, and synchronized creative direction across all music videos.’,
videos: [
{ title: ‘Control ft. Chelsea Dinorath & Djodje’, link: ‘https://youtu.be/7L5dP16V_Z8?si=_OG0L5Lral-RbPfG’ },
{ title: ‘Tarraxinha ft. CEF Tanzy’, link: ‘https://youtu.be/2vu7xweWpWQ?si=hFTGdAAIJfjMD4w0’ },
{ title: ‘No Tempo Certo ft. Altifridi’, link: ‘https://youtu.be/2vu7xweWpWQ?si=hFTGdAAIJfjMD4w0’ },
{ title: ‘Grega ft. C4 Pedro & Bruna Amado’, link: ‘https://youtu.be/2YtccWxlUhE?si=ce2BPBITmz84AsgJ’ },
],
};

return (
<div className="min-h-screen bg-black text-white overflow-hidden">
<nav
className={`fixed top-0 w-full z-50 transition-all duration-300 ${ scrolled ? 'bg-black/95 backdrop-blur border-b border-red-900/20' : 'bg-transparent' }`}
>
<div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
<div className="text-2xl font-bold tracking-wider">
WHITE<span className="text-red-600">.</span>
</div>
<div className="hidden md:flex gap-8 text-sm">
<a href="#work" className="hover:text-red-600 transition">Work</a>
<a href="#videos" className="hover:text-red-600 transition">Videos</a>
<a href="#photography" className="hover:text-red-600 transition">Photography</a>
<a href="#album" className="hover:text-red-600 transition">Album Concept</a>
<a href="#metrics" className="hover:text-red-600 transition">Impact</a>
<a href="#partners" className="hover:text-red-600 transition">Partners</a>
<a href="#contact" className="hover:text-red-600 transition">Contact</a>
</div>
</div>
</nav>

```
  <section className="pt-32 pb-20 px-6 relative overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 z-10">
          <div className="space-y-4">
            <p className="text-red-600 font-mono tracking-widest text-sm uppercase">Creative Director</p>
            <h1 className="text-6xl md:text-7xl font-black leading-tight tracking-tight">
              White<br />Coimbra
            </h1>
            <p className="text-xl text-gray-400 max-w-sm">
              Executive Producer. Artist. Strategist. Crafting bold visual stories across Angola, Namibia, and São Paulo.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-gray-500">EXPERTISE</p>
            <div className="flex flex-wrap gap-2">
              {['Creative Direction', 'Production', 'Social Strategy', 'Brand Activation'].map((skill) => (
                <span key={skill} className="px-4 py-2 border border-red-600/30 text-xs font-mono hover:bg-red-600/10 transition">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <a href="#work" className="inline-flex items-center gap-2 text-red-600 hover:gap-4 transition-all font-mono text-sm">
            View Work <ChevronDown size={16} className="rotate-90" />
          </a>
        </div>

        <div className="relative h-96 md:h-full rounded-lg overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent z-20"></div>
          <img src="https://images.unsplash.com/photo-1534737565826-75a84c7e79d9?w=800&fit=crop" alt="White Coimbra" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
        </div>
      </div>
    </div>

    <div className="absolute top-20 right-10 w-96 h-96 bg-red-600/5 rounded-full blur-3xl"></div>
  </section>

  <section id="work" className="py-24 px-6 bg-gradient-to-b from-black to-black/50 border-t border-red-900/20">
    <div className="max-w-7xl mx-auto">
      <div className="mb-16">
        <p className="text-red-600 font-mono text-sm uppercase tracking-widest mb-4">Creative Portfolio</p>
        <h2 className="text-5xl font-black mb-4">Selected Works</h2>
        <p className="text-gray-400 max-w-2xl">
          From institutional films to music videos, brand campaigns to social media strategy. Each project reflects strategic thinking, cultural authenticity, and meticulous execution.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {work.map((project, i) => (
          <div key={i} className="group relative overflow-hidden rounded-lg aspect-video md:aspect-square bg-black/50 border border-red-900/20 hover:border-red-600/50 transition">
            <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition duration-500" style={{ backgroundImage: project.image }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-6">
              <p className="text-red-600 text-xs font-mono uppercase mb-2">{project.category}</p>
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-300 text-sm">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>

  <section className="py-16 px-6 border-t border-red-900/20">
    <div className="max-w-7xl mx-auto">
      <p className="text-red-600 font-mono text-xs uppercase tracking-widest mb-8">Clients & Partners</p>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {clients.map((client, i) => (
          <div key={i} className="p-4 border border-red-900/20 rounded hover:bg-red-600/5 transition text-center">
            <p className="font-mono text-sm text-gray-300">{client}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  <section id="videos" className="py-24 px-6 bg-black border-t border-red-900/20">
    <div className="max-w-7xl mx-auto">
      <div className="mb-16">
        <p className="text-red-600 font-mono text-sm uppercase tracking-widest mb-4">Music Videos</p>
        <h2 className="text-5xl font-black mb-4">Creative Direction & Production</h2>
        <p className="text-gray-400 max-w-2xl">
          Strategic creative direction for music videos across multiple genres and artists. Bringing conceptual depth, cultural authenticity, and cinematic quality to every frame.
        </p>
      </div>

      <div className="space-y-3">
        {videoTreatments.map((video, i) => (
          <div key={i} className="p-6 border border-red-900/20 rounded hover:border-red-600/50 hover:bg-red-600/5 transition group">
            <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
              <div className="flex-1">
                <p className="text-red-600 font-mono text-xs uppercase mb-2">{video.role}</p>
                <h3 className="text-xl font-bold mb-2">{video.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{video.description}</p>
                <span className="text-xs text-gray-500">{video.year}</span>
              </div>
              <a href={video.link} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-red-600 hover:bg-red-700 transition rounded font-mono text-sm flex items-center gap-2 whitespace-nowrap h-fit">
                <Play size={16} /> Watch
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>

  <section id="photography" className="py-24 px-6 bg-gradient-to-b from-black to-black/50 border-t border-red-900/20">
    <div className="max-w-7xl mx-auto">
      <div className="mb-16">
        <p className="text-red-600 font-mono text-sm uppercase tracking-widest mb-4">Photography</p>
        <h2 className="text-5xl font-black mb-4">Creative Direction in Photography</h2>
        <p className="text-gray-400 max-w-2xl">
          Editorial direction across fashion, portrait, and lifestyle photography. Strategic styling, art direction, and visual storytelling that elevates every frame.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader size={32} className="text-red-600 animate-spin" />
          <p className="ml-4 text-gray-400">Loading photos...</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {photographyProjects.map((project, i) => (
            <div key={i} className="p-8 border border-red-600/30 rounded-lg bg-red-600/5 hover:bg-red-600/10 transition">
              <div className="mb-6">
                <p className="text-red-600 font-mono text-xs uppercase mb-3">{project.role}</p>
                <h3 className="text-2xl font-black mb-6">{project.title}</h3>
              </div>

              <div className="space-y-4">
                {Array.from({ length: project.photoCount }).map((_, idx) => (
                  <div key={idx} className="relative group">
                    {photos[project.title]?.[idx + 1] ? (
                      <div>
                        <img src={photos[project.title][idx + 1]} alt={`${project.title} Photo ${idx + 1}`} className="w-full aspect-square bg-gray-800 border border-red-900/20 rounded object-cover" />
                        <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition rounded cursor-pointer">
                          {uploading ? (
                            <Loader size={24} className="text-white animate-spin" />
                          ) : (
                            <Upload size={24} className="text-white" />
                          )}
                          <input type="file" accept="image/*" onChange={(e) => handlePhotoUpload(project.title, idx + 1, e)} disabled={uploading} className="hidden" />
                        </label>
                      </div>
                    ) : (
                      <label className="w-full aspect-square bg-gray-800 border border-red-900/20 rounded flex items-center justify-center text-gray-500 text-sm cursor-pointer hover:bg-gray-700 transition">
                        <div className="text-center">
                          {uploading ? (
                            <Loader size={24} className="mx-auto mb-2 animate-spin text-red-600" />
                          ) : (
                            <Upload size={24} className="mx-auto mb-2" />
                          )}
                          <p>Click to upload Photo {idx + 1}</p>
                        </div>
                        <input type="file" accept="image/*" onChange={(e) => handlePhotoUpload(project.title, idx + 1, e)} disabled={uploading} className="hidden" />
                      </label>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </section>

  <section id="album" className="py-24 px-6 border-t border-red-900/20">
    <div className="max-w-7xl mx-auto">
      <div className="mb-16">
        <p className="text-red-600 font-mono text-sm uppercase tracking-widest mb-4">Album Concept</p>
        <h2 className="text-5xl font-black mb-4">Black Spygo: {blackSpygoAlbumConcept.title}</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="p-8 border border-red-600/30 rounded-lg bg-red-600/5">
          <h3 className="text-2xl font-black mb-4">{blackSpygoAlbumConcept.concept}</h3>
          <p className="text-gray-300 mb-6 leading-relaxed">{blackSpygoAlbumConcept.description}</p>
          <div className="space-y-2">
            <p className="text-sm text-gray-400"><strong>Year:</strong> {blackSpygoAlbumConcept.year}</p>
            <p className="text-sm text-gray-400"><strong>Key Theme:</strong> Artistic representations of time through color, technique, and narrative</p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-red-600 font-mono text-xs uppercase tracking-widest mb-4">Videos in Concept</p>
          {blackSpygoAlbumConcept.videos.map((video, i) => (
            <a key={i} href={video.link} target="_blank" rel="noopener noreferrer" className="p-4 border border-red-900/20 rounded hover:bg-red-600/5 transition block group">
              <h4 className="font-bold mb-2 group-hover:text-red-600 transition">{video.title}</h4>
              <div className="flex items-center gap-2 text-red-600 font-mono text-xs">
                <Play size={14} /> Watch Video
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  </section>

  <section id="metrics" className="py-24 px-6 bg-black border-t border-red-900/20">
    <div className="max-w-7xl mx-auto">
      <div className="mb-16">
        <p className="text-red-600 font-mono text-sm uppercase tracking-widest mb-4">Social Media Management</p>
        <h2 className="text-5xl font-black mb-4">Yola Semedo: Years of Strategic Growth</h2>
        <p className="text-gray-400 max-w-2xl">
          Since 2016, I have managed Yola Semedo's social presence across Instagram and Facebook, building her digital community while delivering consistent, high-impact content aligned with her artistic vision.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {yolaMetrics.map((metric, i) => (
          <div key={i} className="p-8 border border-red-600/30 rounded-lg bg-red-600/5 hover:bg-red-600/10 transition">
            <p className="text-red-600 font-mono text-xs uppercase tracking-widest mb-6">{metric.platform}</p>
            <div className="space-y-6">
              <div>
                <p className="text-gray-500 text-sm mb-2">Current Followers</p>
                <p className="text-4xl font-black text-red-600">{metric.followers}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-2">Engagement Rate</p>
                <p className="text-2xl font-bold">{metric.engagement}</p>
              </div>
              <p className="text-gray-400 text-sm italic border-t border-red-900/20 pt-4">{metric.period}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 bg-gradient-to-r from-red-600/10 to-transparent border border-red-600/30 rounded-lg">
        <p className="text-sm text-gray-300 mb-4">
          Update metrics: Download your Instagram and Facebook analytics and share the numbers (followers, engagement rate, growth period) to populate this section with live data.
        </p>
        <a href="mailto:coimbrawhitney@gmail.com" className="inline-flex items-center gap-2 text-red-600 hover:text-red-400 transition font-mono text-sm">
          Send metrics <Mail size={16} />
        </a>
      </div>
    </div>
  </section>

  <section id="partners" className="py-24 px-6 border-t border-red-900/20 bg-black">
    <div className="max-w-7xl mx-auto">
      <p className="text-red-600 font-mono text-sm uppercase tracking-widest mb-8">Agency Partnership</p>
      <div className="max-w-3xl">
        <div className="p-8 border border-red-600/30 rounded-lg bg-red-600/5 hover:bg-red-600/10 transition">
          <h3 className="text-3xl font-black mb-4">Rotina Mídia</h3>
          <p className="text-gray-300 mb-4">
            Leading creative partner for strategic campaigns, brand activations, and integrated media solutions across Angola and the Lusophone market.
          </p>
          <p className="text-gray-400 text-sm">
            As Creative Director and Executive Producer, I collaborate with Rotina Mídia to deliver high-impact projects for premium brands including Banco BAI, Africell, Afrimoney, and more. Our partnership combines strategic thinking with production excellence to create campaigns that resonate culturally and commercially.
          </p>
        </div>
      </div>
    </div>
  </section>

  <section className="py-24 px-6 border-t border-red-900/20">
    <div className="max-w-4xl mx-auto">
      <p className="text-red-600 font-mono text-sm uppercase tracking-widest mb-8">About</p>
      <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
        <p>
          Born in Windhoek, Namibia, I grew up immersed in the Angolan creative scene through my family, the youngest sister of IMPACTUS 4. This heritage shaped my deep understanding of Lusophone culture and artistic excellence.
        </p>
        <p>
          Starting as Yola Semedo's social media manager in 2016, I evolved into a sought-after creative director, working across music, entertainment, and corporate sectors. My journey includes four years in Minnesota studying music, followed by relocation to Luanda and now São Paulo. Each chapter added international perspective to my work.
        </p>
        <p>
          What I bring: Strategic thinking grounded in cultural authenticity. Production excellence across video, photography, and brand campaigns. Fluency in Portuguese, English, and French. An unwavering commitment to crafting visual stories that resonate globally while honoring local nuance.
        </p>
      </div>
    </div>
  </section>

  <section id="contact" className="py-24 px-6 border-t border-red-900/20 bg-gradient-to-b from-black to-red-950/10">
    <div className="max-w-4xl mx-auto text-center">
      <p className="text-red-600 font-mono text-sm uppercase tracking-widest mb-6">Get In Touch</p>
      <h2 className="text-5xl font-black mb-8">Let's Create Something Bold</h2>
      <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
        Whether you are looking for creative direction, social media strategy, or full-scale production, I am ready to bring your vision to life.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <a href="mailto:coimbrawhitney@gmail.com" className="p-6 border border-red-600/30 rounded hover:bg-red-600/10 transition group">
          <Mail className="mx-auto mb-4 text-red-600 group-hover:scale-110 transition" size={32} />
          <p className="font-mono text-sm text-gray-400 break-all">coimbrawhitney@gmail.com</p>
        </a>

        <a href="https://instagram.com/white.branca" target="_blank" rel="noopener noreferrer" className="p-6 border border-red-600/30 rounded hover:bg-red-600/10 transition group">
          <Instagram className="mx-auto mb-4 text-red-600 group-hover:scale-110 transition" size={32} />
          <p className="font-mono text-sm text-gray-400">@white.branca</p>
        </a>

        <a href="https://tiktok.com/@white.branca" target="_blank" rel="noopener noreferrer" className="p-6 border border-red-600/30 rounded hover:bg-red-600/10 transition group">
          <div className="mx-auto mb-4 text-red-600 group-hover:scale-110 transition text-3xl font-bold">TT</div>
          <p className="font-mono text-sm text-gray-400">@white.branca</p>
        </a>
      </div>

      <p className="text-gray-500 text-sm">Based in São Paulo. Available for remote and on-site projects</p>
    </div>
  </section>

  <footer className="py-8 px-6 border-t border-red-900/20 text-center text-gray-600 text-sm font-mono">
    <p>© 2026 White Coimbra. All rights reserved.</p>
  </footer>
</div>
```

);
}
