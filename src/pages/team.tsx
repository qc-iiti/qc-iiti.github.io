import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import Team from "@/components/content/Team";

type ExampleData = {
  title: string;
  description: string;
};

const HomePage: React.FC = () => {

  const [data, setData] = useState<ExampleData | null>(null);

  useEffect(() => {
    fetch("/data/exampleData.json")//i used this for by chance
      .then((res) => res.json())
      .then((fetchedData) => setData(fetchedData))
      .catch((err) => console.error("Error loading data:", err));
  }, []);

  return (
    <div className="homepage">
      <Layout isHomePage={true}>
        <Team />
      </Layout>
    </div>
  );
};

export default HomePage;
