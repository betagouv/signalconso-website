import {ArboVisu} from '@/components_feature/ArboVisu'
import {buildGenerateMetadata} from '@/core/metadatas'

export const generateMetadata = buildGenerateMetadata('arboVisu')

const Page = () => {
  return (
    <div className="fr-container">
      <h1>arbo visu</h1>
      <ArboVisu />
    </div>
  )
}

export default Page

const treeData = {
  name: 'Root',
  children: [
    {
      name: 'Branch 1',
      children: [{name: 'Leaf 1.1'}, {name: 'Leaf 1.2'}, {name: 'Leaf 1.3'}],
    },
    {
      name: 'Branch 2',
      children: [
        {name: 'Leaf 2.1'},
        {
          name: 'Sub-Branch 2.2',
          children: [{name: 'Leaf 2.2.1'}, {name: 'Leaf 2.2.2'}],
        },
      ],
    },
    {
      name: 'Branch 3',
    },
  ],
}
