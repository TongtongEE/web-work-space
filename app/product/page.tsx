import Footer from "@/components/Footer";
import ProductHero from "@/components/productsection/ProductHero";
import ProductSection2 from "@/components/productsection/ProductSection2";
import ProductSection3 from "@/components/productsection/ProductSection3";
import ProductSection4 from "@/components/productsection/ProductSection4";
import ProductSection5 from "@/components/productsection/ProductSection5";
import ProductSection6 from "@/components/productsection/ProductSection6";

export default function ProductPage() {
  return (
    <>
      <main className="relative overflow-hidden">
        <ProductHero />
        <ProductSection2 />
        <ProductSection3 />
        <ProductSection4 />
        <ProductSection5 />
        <ProductSection6 />
      </main>
      <Footer />
    </>
  );
}
