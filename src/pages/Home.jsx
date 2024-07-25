import Banner from "../components/Banner"

export default function Home() {
  const data = {
    title: "Welcome to Capstone 3",
    content:
      "Capstone 3 has the world's best guides to web development ebooks. Learn key points and gain insights you won't find anywhere else. Understand the world's best ideas.",
    destination: "/product",
    buttonLabel: "Buy now!",
  }

  return (
    <div className="container d-flex align-items-center text-center mt-5">
      <Banner data={data} />
    </div>
  )
}
