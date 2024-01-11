import axios from 'axios';
import fs from 'fs';
import path from 'path';

// Définissez une interface pour les props
interface SatisfactionProps {
  titre: string;
  tauxSatisfaction: number | null;
}

export async function getServerSideProps() {
  const filePath = path.join(process.cwd(), 'data.json');
  let data: any;

  if (fs.existsSync(filePath)) {
    data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } else {
    const apiUrl = 'https://opendata.plus.transformation.gouv.fr/api/explore/v2.1/catalog/datasets/export-resultats/records?where=%22Taux%20de%20satisfaction%20des%20usagers%22%20AND%20%22IND-27%22&order_by=date_de_mise_a_jour%20desc&limit=1';
    try {
      const response = await axios.get(apiUrl);
      data = response.data;
      fs.writeFileSync(filePath, JSON.stringify(data), 'utf8');
    } catch (error) {
      console.error(error);
      return { props: { titre: '', tauxSatisfaction: null } };
    }
  }

  const result = data.results[0];
  const titre = result.titre_original_de_l_indicateur as string;
  const tauxSatisfaction = result.valeur as number;

  return { props: { titre, tauxSatisfaction } };
}

function Satisfaction({ titre, tauxSatisfaction }: SatisfactionProps) {
  return (
    <div>
      <h1>{titre}</h1>
      <p>{tauxSatisfaction !== null ? `${tauxSatisfaction} %` : 'Donnée non disponible'}</p>
    </div>
  );
}

export default Satisfaction;