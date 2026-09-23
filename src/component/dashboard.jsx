import { useMemo, useState } from 'react'

const newsItems = [
	{ id: 1, category: 'Teknologi', title: 'Indonesia Percepat Transformasi Digital di Berbagai Sektor', description: 'Ekosistem digital nasional terus berkembang, membuka peluang baru bagi pelaku usaha dan masyarakat.', author: 'Nadia Putri', date: '23 Sep 2026', readTime: '4 min baca', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=85' },
	{ id: 2, category: 'Ekonomi', title: 'Pasar Kreatif Lokal Jadi Penggerak Ekonomi Baru', description: 'Produk buatan anak bangsa semakin diminati dan berhasil menembus pasar regional Asia Tenggara.', author: 'Raka Aditya', date: '23 Sep 2026', readTime: '6 min baca', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=85' },
	{ id: 3, category: 'Gaya Hidup', title: 'Ruang Hijau Kota dan Manfaatnya untuk Kesehatan Mental', description: 'Kehadiran taman kota memberikan ruang istirahat yang penting di tengah ritme kehidupan yang padat.', author: 'Sinta Maharani', date: '22 Sep 2026', readTime: '5 min baca', image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=900&q=85' },
	{ id: 4, category: 'Sains', title: 'Peneliti Temukan Cara Baru Menjaga Laut Tetap Bersih', description: 'Inovasi material ramah lingkungan memberi harapan baru untuk mengurangi sampah plastik di lautan.', author: 'Fajar Nugroho', date: '22 Sep 2026', readTime: '7 min baca', image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=85' },
	{ id: 5, category: 'Olahraga', title: 'Generasi Muda dan Semangat Baru Olahraga Nasional', description: 'Komunitas olahraga tumbuh di berbagai daerah dan melahirkan talenta-talenta baru yang inspiratif.', author: 'Dimas Ardi', date: '21 Sep 2026', readTime: '3 min baca', image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=85' },
	{ id: 6, category: 'Budaya', title: 'Menjaga Cerita Nusantara Lewat Generasi Digital', description: 'Teknologi membantu kisah, karya, dan tradisi Indonesia menemukan cara baru untuk terus hidup.', author: 'Alya Prameswari', date: '20 Sep 2026', readTime: '5 min baca', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=85' },
]
const categories = ['Semua', 'Teknologi', 'Ekonomi', 'Gaya Hidup', 'Sains', 'Olahraga', 'Budaya']

function SearchIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5" /><path d="m16 16 5 5" /></svg> }
function ArrowIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg> }

function Dashboard() {
	const [activeCategory, setActiveCategory] = useState('Semua')
	const [search, setSearch] = useState('')
	const filteredNews = useMemo(() => {
		const query = search.toLowerCase().trim()
		return newsItems.filter((news) => {
			const matchesCategory = activeCategory === 'Semua' || news.category === activeCategory
			const matchesSearch = !query || `${news.title} ${news.description} ${news.category}`.toLowerCase().includes(query)
			return matchesCategory && matchesSearch
		})
	}, [activeCategory, search])

	return (
		<main className="news-dashboard">
			<header className="site-header">
				<a className="brand" href="/" aria-label="Nusa kembali ke beranda"><span className="brand-mark">N</span><span>NUSA<span className="brand-dot">.</span></span></a>
				<nav className="main-nav" aria-label="Navigasi utama"><a className="active" href="#berita">Berita</a><a href="#terpopuler">Terpopuler</a><a href="#tentang">Tentang kami</a></nav>
				<button className="subscribe-button" type="button">Berlangganan</button>
			</header>
			<section className="dashboard-intro" id="berita">
				<div><p className="eyebrow">Rabu, 23 September 2026</p><h1>Berita hari ini,<br /><em>untuk kamu.</em></h1><p className="intro-copy">Ikuti kabar terbaru dari Indonesia dan dunia, dirangkum dengan jernih dan bermakna.</p></div>
				<div className="daily-note"><span className="note-line" /><p>“Informasi yang baik memberi kita perspektif untuk melangkah lebih jauh.”</p><span className="note-source">Nusa Editorial</span></div>
			</section>
			<section className="news-toolbar" aria-label="Penyaring berita">
				<div className="category-list" role="tablist" aria-label="Kategori berita">{categories.map((category) => <button className={activeCategory === category ? 'category active' : 'category'} key={category} onClick={() => setActiveCategory(category)} role="tab" aria-selected={activeCategory === category} type="button">{category}</button>)}</div>
				<label className="search-box"><SearchIcon /><span className="sr-only">Cari berita</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Cari berita" /></label>
			</section>
			<section className="news-section" id="terpopuler">
				<div className="section-heading"><div><p className="eyebrow">Pilihan redaksi</p><h2>Berita terbaru</h2></div><span className="result-count">{filteredNews.length} berita ditemukan</span></div>
				<div className="news-grid">{filteredNews.map((news, index) => <article className={`news-card ${index === 0 ? 'featured' : ''}`} key={news.id}>
					<div className="image-wrap"><img src={news.image} alt={news.title} /><span className="card-category">{news.category}</span></div>
					<div className="card-content"><div className="card-meta"><span>{news.date}</span><span>{news.readTime}</span></div><h3>{news.title}</h3><p>{news.description}</p><div className="card-footer"><span className="author">Oleh <strong>{news.author}</strong></span><button className="read-more" type="button" aria-label={`Baca ${news.title}`}><ArrowIcon /></button></div></div>
				</article>)}</div>
				{filteredNews.length === 0 && <p className="empty-state">Berita yang kamu cari belum tersedia.</p>}
			</section>
			<footer id="tentang"><span>NUSA.</span><span>Jurnal harian untuk pikiran yang terbuka.</span><span>© 2026 Nusa Media</span></footer>
		</main>
	)
}

export default Dashboard
