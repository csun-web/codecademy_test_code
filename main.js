// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}


const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    mutate() {
      let change;
      let randInd = Math.floor(Math.random() * 15);
      
      do {
        change = returnRandBase();
      } while (change == this.dna[randInd]);

      this.dna[randInd] = change;
    },
    compareDNA(pAequor) {
      let success = 0;
      for (let i = 0; i < 15; i++) {
        success += this.dna[i] == pAequor.dna[i] ? 1 : 0;
      }

      console.log(`specimen #${this.specimenNum} and specimen #${pAequor.specimenNum} have ${Math.round(success / 15 * 100)}% DNA in common`);
    },
    willLikelySurvive() {
      return this.dna.filter(base => base == "C" || base == "G").length / 15 >= .6;
    }
  }
}

const testBatch = [];
let specimen;
let sId = 1;
while (testBatch.length < 30) {
  specimen = pAequorFactory(sId, mockUpStrand());
  if (specimen.willLikelySurvive()) {
    testBatch.push(specimen);
  }
  sId++;
}

console.log(testBatch);

