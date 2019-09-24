module.exports = {
  "20130606_sample_info.csv": {
    table: 'sample',
    mapper: (data) => {
      const convertToArrayProps = [
        'unexpectedParentChild',
        'nonPaternity',
        'siblings',
        'grandparents',
        'avuncular',
        'halfSiblings',
        'unknownSecondOrder',
        'thirdOrder'
      ]
      convertToArrayProps.forEach((attr) => {
        if (data[attr])
          data[attr] = data[attr].split(',').filter(item => (item.trim().length > 0)).map(value => ({ S: value }))
      });
      return data;
    },
    headers: [
      'sample',
      'familyId',
      'population',
      'populationDescription',
      'gender',
      'relationship',
      'unexpectedParentChild',
      'nonPaternity',
      'siblings',
      'grandparents',
      'avuncular',
      'halfSiblings',
      'unknownSecondOrder',
      'thirdOrder',
      'otherComments'
    ]
  },

  "20130606_sample_info_results.csv": {
    table: 'sample_results',
    headers: [
      'sample',
      'population',
      'verifyBamOmniFree',
      'verifyBamAffyFree',
      'verifyBamOmni Chip',
      'verifyBamAffyChip',
      'indelRatio',
      'passedQC',
      'verifyBamOmniFree',
      'verifyBamAffyFree',
      'verifyBamOmniChip',
      'verifyBamAffyChip',
      'indelRatio',
      'passedQC'
    ]
  }
}  