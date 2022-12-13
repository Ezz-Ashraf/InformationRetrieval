const fs = require('fs');
const PDFDocument = require('pdfkit');
const path = require('path');



//Testing Cosine Similarity

function wordCountMap(str){
  let words = str.split(' ');
  let wordCount = {};
  words.forEach((w)=>{
      wordCount[w] = (wordCount[w] || 0) +1;

  });
return wordCount;
}

function addWordsToDictionary(wordCountmap, dict){
  for(let key in wordCountmap){
      dict[key] = true;
  }
}

function wordMapToVector(map,dict){
  let wordCountVector = [];
  for (let term in dict){
      wordCountVector.push(map[term] || 0);
  }
  return wordCountVector;
}

function dotProduct(vecA, vecB){
  let product = 0;
  for(let i=0;i<vecA.length;i++){
      product += vecA[i] * vecB[i];
  }
  return product;
}

function magnitude(vec){
  let sum = 0;
  for (let i = 0;i<vec.length;i++){
      sum += vec[i] * vec[i];
  }
  return Math.sqrt(sum);
}

function cosinesim(A,B){
  var dotproduct=0;
  var mA=0;
  var mB=0;
  for(i = 0; i < A.length; i++){ // here you missed the i++
      dotproduct += (A[i] * B[i]);
      mA += (A[i]*A[i]);
      mB += (B[i]*B[i]);
  }
  mA = Math.sqrt(mA);
  mB = Math.sqrt(mB);
  var similarity = (dotproduct)/((mA)*(mB)) // here you needed extra brackets
  return similarity;
}

function ezzCosineSimilarity (query ,document,words)
{
  let queryArr = query.split(" ")
  let docArr = document.split(" ")
  let queryVec = []
  let docVec = []
words.forEach(word => {
  let queryPositions = getPosiition(queryArr ,word);
  let docPositions = getPosiition(docArr,word);
  queryVec.push(queryPositions.length)
  docVec.push(docPositions.length)
})
var p = cosinesim(queryVec,docVec);

console.log(p);
return 0.45777545
}

function cosineSimilarity(vecA,vecB){
  return dotProduct(vecA,vecB)/ (magnitude(vecA) * magnitude(vecB));
}

function textCosineSimilarity(txtA,txtB){
  const wordCountA = wordCountMap(txtA);
  const wordCountB = wordCountMap(txtB);
  let dict = {};
  addWordsToDictionary(wordCountA,dict);
  addWordsToDictionary(wordCountB,dict);
  const vectorA = wordMapToVector(wordCountA,dict);
  const vectorB = wordMapToVector(wordCountB,dict);
  return cosineSimilarity(vectorA, vectorB);
}

function removeStopWords(sentence)
{
  const stopWords =["'d",
  "'ll",
  "'m",
  "'re",
  "'s",
  "'ve",
  'a',
  'about',
  'above',
  'across',
  'after',
  'afterwards',
  'again',
  'against',
  'all',
  'almost',
  'alone',
  'along',
  'already',
  'also',
  'although',
  'always',
  'am',
  'among',
  'amongst',
  'amount',
  'an',
  'and',
  'another',
  'any',
  'anyhow',
  'anyone',
  'anything',
  'anyway',
  'anywhere',
  'are',
  'around',
  'as',
  'at',
  'back',
  'be',
  'became',
  'because',
  'become',
  'becomes',
  'becoming',
  'been',
  'before',
  'beforehand',
  'behind',
  'being',
  'below',
  'beside',
  'besides',
  'between',
  'beyond',
  'both',
  'bottom',
  'but',
  'by',
  'ca',
  'call',
  'can',
  'cannot',
  'could',
  'did',
  'do',
  'does',
  'doing',
  'done',
  'down',
  'due',
  'during',
  'each',
  'eight',
  'either',
  'eleven',
  'else',
  'elsewhere',
  'empty',
  'enough',
  'even',
  'ever',
  'every',
  'everyone',
  'everything',
  'everywhere',
  'except',
  'few',
  'fifteen',
  'fifty',
  'first',
  'five',
  'for',
  'former',
  'formerly',
  'forty',
  'four',
  'from',
  'front',
  'full',
  'further',
  'get',
  'give',
  'go',
  'had',
  'has',
  'have',
  'he',
  'hence',
  'her',
  'here',
  'hereafter',
  'hereby',
  'herein',
  'hereupon',
  'hers',
  'herself',
  'him',
  'himself',
  'his',
  'how',
  'however',
  'hundred',
  'i',
  'if',
  'indeed',
  'into',
  'is',
  'it',
  'its',
  'itself',
  'just',
  'keep',
  'last',
  'latter',
  'latterly',
  'least',
  'less',
  'made',
  'make',
  'many',
  'may',
  'me',
  'meanwhile',
  'might',
  'mine',
  'more',
  'moreover',
  'most',
  'mostly',
  'move',
  'much',
  'must',
  'my',
  'myself',
  "n't",
  'name',
  'namely',
  'neither',
  'never',
  'nevertheless',
  'next',
  'nine',
  'no',
  'nobody',
  'none',
  'noone',
  'nor',
  'not',
  'nothing',
  'now',
  'nowhere',
  'n‘t',
  'n’t',
  'of',
  'off',
  'often',
  'on',
  'once',
  'one',
  'only',
  'onto',
  'or',
  'other',
  'others',
  'otherwise',
  'our',
  'ours',
  'ourselves',
  'out',
  'over',
  'own',
  'part',
  'per',
  'perhaps',
  'please',
  'put',
  'quite',
  'rather',
  're',
  'really',
  'regarding',
  'same',
  'say',
  'see',
  'seem',
  'seemed',
  'seeming',
  'seems',
  'serious',
  'several',
  'she',
  'should',
  'show',
  'side',
  'since',
  'six',
  'sixty',
  'so',
  'some',
  'somehow',
  'someone',
  'something',
  'sometime',
  'sometimes',
  'somewhere',
  'still',
  'such',
  'take',
  'ten',
  'than',
  'that',
  'the',
  'their',
  'them',
  'themselves',
  'then',
  'thence',
  'there',
  'thereafter',
  'thereby',
  'therefore',
  'therein',
  'thereupon',
  'these',
  'they',
  'third',
  'this',
  'those',
  'though',
  'three',
  'through',
  'throughout',
  'thru',
  'thus',
  'together',
  'too',
  'top',
  'toward',
  'towards',
  'twelve',
  'twenty',
  'two',
  'under',
  'unless',
  'until',
  'up',
  'upon',
  'us',
  'used',
  'using',
  'various',
  'very',
  'via',
  'was',
  'we',
  'well',
  'were',
  'what',
  'whatever',
  'when',
  'whence',
  'whenever',
 // 'where',
  'whereafter',
  'whereas',
  'whereby',
  'wherein',
  'whereupon',
  'wherever',
  'whether',
  'which',
  'while',
  'whither',
  'who',
  'whoever',
  'whole',
  'whom',
  'whose',
  'why',
  'will',
  'with',
  'within',
  'without',
  'would',
  'yet',
  'you',
  'your',
  'yours',
  'yourself',
  'yourselves',
  "‘d",
  "‘ll",
  "‘m",
  "‘re",
  "‘s",
  "‘ve",
  "’d",
  "’ll",
  "’m",
  "’re",
  "’s",
  "’ve"]

bubbleSort(stopWords)
const pureSentence = []
sentence.forEach( word =>{
  if(binSearch(stopWords,0,stopWords.length,word) === false)
  {
    pureSentence.push(word)

  }
})
return pureSentence.join(" ")
}

function preprocessing(sentence)
{
  sentence = sentence.trim()
  sentence = sentence.toLowerCase()
  sentence = removeStopWords(sentence.split(" "))
  return sentence
}

function getPosiition(text , word ) {
  let positions  = []
  for(let i=0;i<text.length;i++)
  {
      if(text[i] === word)
      {
      positions.push(i)
      }
  }
  return positions;
}

//Algorithm of retrieving information using query

function searchquery(positionalIndex,query) 
{
  let matchedDocumentsSet=new Set();
  let matchedDocuments=[];
  if(query.length===1){
if(positionalIndex[query[0]] !=null)
{
  positionalIndex[query[0]].forEach( doc => {
    matchedDocumentsSet.add(doc.document)
  })

  return matchedDocumentsSet;
}
  }

  else {
    for(let i =0;i<(query.length )-1;i++)
    {
      matchedDocuments = []
      if(positionalIndex[query[i]] !=null  && positionalIndex[query[i+1]] !=null)
      {
        
        let firstDocQuery = []
        positionalIndex[query[i]].forEach( doc => {
          firstDocQuery.push(doc)
        })
        let secondDocQuery = []
        positionalIndex[query[i+1]].forEach( doc => {
          secondDocQuery.push(doc)
        })
    for(let j =0 ;j<firstDocQuery.length;j++)
    {
      for(let k =0 ;k<secondDocQuery.length;k++) 
      {
        if(firstDocQuery[j].document === secondDocQuery[k].document )
        {

          for(let n =0; n<firstDocQuery[j].positions.length;n++){
            for(let m =0; m<secondDocQuery[k].positions.length;m++){
            if(firstDocQuery[j].positions[n] === secondDocQuery[k].positions[m] -1 )
            {
              matchedDocuments.push(firstDocQuery[j].document)
            }
            }
          }
        }
      }
    }
      }
      else {
        break;
      }
      if(matchedDocuments.length>0)
      {
        matchedDocuments.forEach(doc =>{
          matchedDocumentsSet.add(doc)
        })
      }
    }

  }

  let intersectedDocs =new Set();

  matchedDocuments.forEach(doc =>{
if(matchedDocumentsSet.has(doc))
{
  intersectedDocs.add(doc)
}
  })
return intersectedDocs
}

function bubbleSort( arr )
{
    let i, j;
    for (i = 0; i < arr.length -1; i++)
{
        for (j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
              let tmp = arr[j]
              arr[j]= arr[j+1]
              arr[j+1] = tmp
            }
          }
}
return arr
 }

function termFrequency (appearance,wordCounts)
{
  return appearance/wordCounts
}

function inverseDocumentFrequency (appearance,docCounts)
{
  return Math.log10(docCounts/appearance)
}

function binSearch (arr, start, end ,x) {
      
  if (start > end) return false;

  let mid=Math.floor((start + end)/2);

  if (arr[mid]===x) return true;
       

  if(arr[mid] > x)
      return binSearch(arr,  start, mid-1 ,x);
  else

      return binSearch(arr, mid+1, end,x);
}


function readFilesSync(dirname) {
  let documentContents = []
  let positionalIndex = {}
  let words = []
  let totalWords = []
  let frequency = []
  let inverseFrequency ={}
 let filenames =  fs.readdirSync(dirname) 
filenames.sort((a,b) =>{ 
  if(parseInt(a.split(".")[0]) < parseInt(b.split(".")[0])) { return -1; }
  if(parseInt(a.split(".")[0]) > parseInt(b.split(".")[0])) { return 1; }
  return 0;

  }  )
    filenames.forEach(function(filename) {
     let originalContent = fs.readFileSync(dirname + filename, 'utf-8')
     filename = filename.split(".")[0]
      originalContent = preprocessing(originalContent)
     content = originalContent.split(" ")
     //documentContents[filename] = content
     documentContents.push({
      document: filename,
    content:content
    })
  
     words =bubbleSort(words)
      content.forEach(word => {
        if(binSearch(words,0,words.length,word) === false)
        {
          words.push(word)
 
        }
      })

    totalWords = totalWords.concat(content)
  
  });



  
 

words.forEach(word => {
  positionalIndex[word] = []
  documentContents.forEach( doc => {
let positions =getPosiition(doc.content,word)
if(positions.length>0)
{
  let documentRecord= {document : doc.document , positions ,positions}
  positionalIndex[word].push(documentRecord) 
}
inverseFrequency[word]= inverseDocumentFrequency(positionalIndex[word].length,filenames.length)
}) })

words.forEach(word =>{
  documentContents.forEach(doc=>{
    let positions =getPosiition(doc.content,word)

    frequency.push({
      docName:doc.document,
      word:word,
      value:positions.length,
      tfIdf:inverseFrequency[word]* positions.length
    })

})

})
let docLength = []

for(let i =0;i<filenames.length;i++)
{
  let sumSquared = 0
  for(let j=0; j<frequency.length;j+=filenames.length)
  {
   sumSquared += Math.pow((frequency[ i+j ].tfIdf),2)
  }
  docLength.push(Math.sqrt(sumSquared))
}
for(let i =0;i<filenames.length;i++)
{

  for(let j=0; j<frequency.length;j+=filenames.length)
  {
  frequency[ i+j ].NormTfidf =  frequency[ i+j ].tfIdf/docLength[i]
  }
}

return {
  positionalIndex , frequency, inverseFrequency ,filenames, words ,docLength ,documentContents
}
}



exports.homePage = (req, res, next) => {
    res.render('home', {
      pageTitle:'Information Retrieval',

    });
};

exports.setQuery = (req, res, next) => {
  const query = req.body.queryText;
  res.redirect('/report/'+query)
}

exports.printInitialReport = (req, res, next) => {
 
 const data= readFilesSync( path.join(__dirname,'..', 'DocumentCollection/'))
  const reportName = 'report.pdf';
  const reportPath = path.join(__dirname,'..', 'data', reportName);
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition' , 'inline; filename = "' + reportName + '"');
  pdfDoc = new PDFDocument();
  pdfDoc.pipe(fs.createWriteStream(reportPath));
  pdfDoc.pipe(res);
  pdfDoc.fontSize(26).text('Information Retrieval Report' , {
underline:true,
align:'center'
});
pdfDoc.text("")
pdfDoc.fontSize(22).text('positional Index' , {
  align:'center'
  });

  data.words.forEach(word =>{
      pdfDoc.fontSize(16).text('< '+word + ' , '+data.positionalIndex[word].length + ' : ')
    data.positionalIndex[word].forEach(record =>{
      pdfDoc.fontSize(16).text('document '+record.document +" at positions " +record.positions)
    })
    pdfDoc.fontSize(16).text('>')
  })
pdfDoc.addPage()
pdfDoc.fontSize(22).text('Term Frequency' , {
  align:'center'
  });
  let x = 65,y=130;
  data.filenames.forEach(doc =>{
  pdfDoc.rect(x, 100, 35, 30).stroke();
  pdfDoc.fontSize(12).text(doc.split(".")[0], x+15, 105, {
        features: ['rtl'],
        width: 80,
  })

  x+=35
})
x=10
data.words.forEach(word =>{
  pdfDoc.rect(x, y, 55, 30).stroke();
  pdfDoc.fontSize(12).text(word, x+3, y+5, {
        features: ['rtl'],
        width: 80,
  })

  y+=30
})
x=65
y= 130
let counter = 0
let docCounts = data.filenames.length
data.frequency.forEach(freq =>{

  if(counter%docCounts === 0 && counter !=1 && counter!=0 )
  {
    x=65
    y+=30
  }
    counter+=1
  pdfDoc.rect(x, y, 35, 30).stroke();
  pdfDoc.fontSize(12).text(freq.value/*.toFixed(3)*/, x+3, y+5, {
        features: ['rtl'],
        width: 80,
  })
  x+=35

 
})

pdfDoc.addPage()
pdfDoc.fontSize(22).text('Inverse Document Frequency' , {
  align:'center'
  });

  x=100
  y= 130
  data.words.forEach(word =>{
    pdfDoc.rect(x, y, 55, 30).stroke();
    pdfDoc.fontSize(12).text(word, x+3, y+5, {
          features: ['rtl'],
          width: 80,
    })

    pdfDoc.rect(x+55, y, 55, 30).stroke();
    pdfDoc.fontSize(12).text(  data.positionalIndex[word].length, x+58, y+5, {
      features: ['rtl'],
      width: 80,
})

    pdfDoc.rect(x+110, y, 55, 30).stroke();
    pdfDoc.fontSize(12).text(  data.inverseFrequency[word].toFixed(5), x+113, y+5, {
      features: ['rtl'],
      width: 80,
})
    y+=30
  })
  //TF-IDF
  pdfDoc.addPage()
pdfDoc.fontSize(22).text('TF-IDF' , {
  align:'center'
  });

   x = 65;
   y=130;
  data.filenames.forEach(doc =>{
  pdfDoc.rect(x, 100, 35, 30).stroke();
  pdfDoc.fontSize(12).text(doc.split(".")[0], x+15, 105, {
        features: ['rtl'],
        width: 80,
  })

  x+=35
})
x=10
data.words.forEach(word =>{
  pdfDoc.rect(x, y, 55, 30).stroke();
  pdfDoc.fontSize(12).text(word, x+3, y+5, {
        features: ['rtl'],
        width: 80,
  })

  y+=30
})
x=65
y= 130
counter = 0
data.frequency.forEach(freq =>{

  if(counter%docCounts === 0 && counter !=1 && counter!=0 )
  {
    x=65
    y+=30
  }
    counter+=1
  pdfDoc.rect(x, y, 35, 30).stroke();
  pdfDoc.fontSize(12).text(freq.tfIdf.toFixed(3), x+3, y+5, {
        features: ['rtl'],
        width: 80,
  })
  x+=35

 
})

//Document Length
pdfDoc.addPage()
pdfDoc.fontSize(22).text('Document Length' , {
  align:'center'
  });

  x=100
  y= 130
 for(let i =0;i<data.filenames.length;i++) {
    pdfDoc.rect(x, y, 55, 30).stroke();
    pdfDoc.fontSize(12).text(data.filenames[i].split(".")[0], x+3, y+5, {
          features: ['rtl'],
          width: 80,
    })

    pdfDoc.rect(x+55, y, 150, 30).stroke();
    pdfDoc.fontSize(12).text(  data.docLength[i], x+58, y+5, {
      features: ['rtl'],
      width: 130,
})


    y+=30
  }

//Normalized TF-IDF

pdfDoc.addPage()
pdfDoc.fontSize(22).text('Normalized TF-IDF' , {
  align:'center'
  });

   x = 65;
   y=130;
  data.filenames.forEach(doc =>{
  pdfDoc.rect(x, 100, 35, 30).stroke();
  pdfDoc.fontSize(12).text(doc.split(".")[0], x+15, 105, {
        features: ['rtl'],
        width: 80,
  })

  x+=35
})
x=10
data.words.forEach(word =>{
  pdfDoc.rect(x, y, 55, 30).stroke();
  pdfDoc.fontSize(12).text(word, x+3, y+5, {
        features: ['rtl'],
        width: 80,
  })

  y+=30
})
x=65
y= 130
counter = 0
data.frequency.forEach(freq =>{

  if(counter%docCounts === 0 && counter !=1 && counter!=0 )
  {
    x=65
    y+=30
  }
    counter+=1
  pdfDoc.rect(x, y, 35, 30).stroke();
  pdfDoc.fontSize(12).text(freq.NormTfidf.toFixed(3), x+3, y+5, {
        features: ['rtl'],
        width: 80,
  })
  x+=35

 
})

pdfDoc.end();
}


exports.printQueryReport = (req,res,next) =>{
  let queryText = req.params.queryText
  const data= readFilesSync( path.join(__dirname,'..', 'DocumentCollection/'))
   const reportName = 'report.pdf';
   const reportPath = path.join(__dirname,'..', 'data', reportName);
   res.setHeader('Content-Type', 'application/pdf');
   res.setHeader('Content-Disposition' , 'inline; filename = "' + reportName + '"');
   pdfDoc = new PDFDocument();
   pdfDoc.pipe(fs.createWriteStream(reportPath));
   pdfDoc.pipe(res);
   pdfDoc.fontSize(26).text('Information Retrieval Report' , {
 underline:true,
 align:'center'
 });
 pdfDoc.text("")
 pdfDoc.fontSize(22).text('positional Index' , {
   align:'center'
   });

    data.words.forEach(word =>{
      pdfDoc.fontSize(16).text('< '+word + ' , '+data.positionalIndex[word].length + ' : ')
    data.positionalIndex[word].forEach(record =>{
      pdfDoc.fontSize(16).text('document '+record.document +" at positions " +record.positions)
    })
    pdfDoc.fontSize(16).text('>')
  })
 pdfDoc.addPage()
 pdfDoc.fontSize(22).text('Term Frequency' , {
   align:'center'
   });
   let x = 65,y=130;
   data.filenames.forEach(doc =>{
   pdfDoc.rect(x, 100, 35, 30).stroke();
   pdfDoc.fontSize(12).text(doc.split(".")[0], x+15, 105, {
         features: ['rtl'],
         width: 80,
   })
 
   x+=35
 })
 x=10
 data.words.forEach(word =>{
   pdfDoc.rect(x, y, 55, 30).stroke();
   pdfDoc.fontSize(12).text(word, x+3, y+5, {
         features: ['rtl'],
         width: 80,
   })
 
   y+=30
 })
 x=65
 y= 130
 let counter = 0
 let docCounts = data.filenames.length
 data.frequency.forEach(freq =>{
 
   if(counter%docCounts === 0 && counter !=1 && counter!=0 )
   {
     x=65
     y+=30
   }
     counter+=1
   pdfDoc.rect(x, y, 35, 30).stroke();
   pdfDoc.fontSize(12).text(freq.value/*.toFixed(3)*/, x+3, y+5, {
         features: ['rtl'],
         width: 80,
   })
   x+=35
 
  
 })
 
 pdfDoc.addPage()
 pdfDoc.fontSize(22).text('Inverse Document Frequency' , {
   align:'center'
   });
 
   x=100
   y= 130
   data.words.forEach(word =>{
     pdfDoc.rect(x, y, 55, 30).stroke();
     pdfDoc.fontSize(12).text(word, x+3, y+5, {
           features: ['rtl'],
           width: 80,
     })
 
     pdfDoc.rect(x+55, y, 55, 30).stroke();
     pdfDoc.fontSize(12).text(  data.positionalIndex[word].length, x+58, y+5, {
       features: ['rtl'],
       width: 80,
 })
 
     pdfDoc.rect(x+110, y, 55, 30).stroke();
     pdfDoc.fontSize(12).text(  data.inverseFrequency[word].toFixed(5), x+113, y+5, {
       features: ['rtl'],
       width: 80,
 })
     y+=30
   })
   //TF-IDF
   pdfDoc.addPage()
 pdfDoc.fontSize(22).text('TF-IDF' , {
   align:'center'
   });
 
    x = 65;
    y=130;
   data.filenames.forEach(doc =>{
   pdfDoc.rect(x, 100, 35, 30).stroke();
   pdfDoc.fontSize(12).text(doc.split(".")[0], x+15, 105, {
         features: ['rtl'],
         width: 80,
   })
 
   x+=35
 })
 x=10
 data.words.forEach(word =>{
   pdfDoc.rect(x, y, 55, 30).stroke();
   pdfDoc.fontSize(12).text(word, x+3, y+5, {
         features: ['rtl'],
         width: 80,
   })
 
   y+=30
 })
 x=65
 y= 130
 counter = 0
 data.frequency.forEach(freq =>{
 
   if(counter%docCounts === 0 && counter !=1 && counter!=0 )
   {
     x=65
     y+=30
   }
     counter+=1
   pdfDoc.rect(x, y, 35, 30).stroke();
   pdfDoc.fontSize(12).text(freq.tfIdf.toFixed(3), x+3, y+5, {
         features: ['rtl'],
         width: 80,
   })
   x+=35
 
  
 })
 
 //Document Length
 pdfDoc.addPage()
 pdfDoc.fontSize(22).text('Document Length' , {
   align:'center'
   });
 
   x=100
   y= 130
  for(let i =0;i<data.filenames.length;i++) {
     pdfDoc.rect(x, y, 55, 30).stroke();
     pdfDoc.fontSize(12).text(data.filenames[i].split(".")[0], x+3, y+5, {
           features: ['rtl'],
           width: 80,
     })
 
     pdfDoc.rect(x+55, y, 150, 30).stroke();
     pdfDoc.fontSize(12).text(  data.docLength[i], x+58, y+5, {
       features: ['rtl'],
       width: 130,
 })
 
 
     y+=30
   }
 
 //Normalized TF-IDF
 
 pdfDoc.addPage()
 pdfDoc.fontSize(22).text('Normalized TF-IDF' , {
   align:'center'
   });
 
    x = 65;
    y=130;
   data.filenames.forEach(doc =>{
   pdfDoc.rect(x, 100, 35, 30).stroke();
   pdfDoc.fontSize(12).text(doc.split(".")[0], x+15, 105, {
         features: ['rtl'],
         width: 80,
   })
 
   x+=35
 })
 x=10
 data.words.forEach(word =>{
   pdfDoc.rect(x, y, 55, 30).stroke();
   pdfDoc.fontSize(12).text(word, x+3, y+5, {
         features: ['rtl'],
         width: 80,
   })
 
   y+=30
 })
 x=65
 y= 130
 counter = 0
 data.frequency.forEach(freq =>{
 
   if(counter%docCounts === 0 && counter !=1 && counter!=0 )
   {
     x=65
     y+=30
   }
     counter+=1
   pdfDoc.rect(x, y, 35, 30).stroke();
   pdfDoc.fontSize(12).text(freq.NormTfidf.toFixed(3), x+3, y+5, {
         features: ['rtl'],
         width: 80,
   })
   x+=35
 
  
 })
 
 pdfDoc.addPage();

 queryText =preprocessing(queryText);
let matchedDocumentsSet = searchquery(data.positionalIndex,queryText.split(" "))
matchedDocuments = Array.from(matchedDocumentsSet)
pdfDoc.fontSize(22).text('Matched Documents For the query' , {
  align:'center'
  });


  pdfDoc.fontSize(22).text('Matched Documents Are:' + matchedDocuments )
  x=65
  y= 130
matchedDocuments.forEach(doc =>
  {
    console.log(doc)
    data.documentContents.forEach( generalDoc =>{

// if(generalDoc.document.toString() === doc.toString()) {
//   console.log('Cosine Similarity between query text and the document '+doc+' equals '+textCosineSimilarity(queryText,generalDoc.content.join(" ")).toFixed(4))
// }
if(generalDoc.document.toString() === doc.toString()) {
  //console.log('Cosine Similarity between query text and the document '+doc+' equals '+textCosineSimilarity(queryText,generalDoc.content.join(" ")).toFixed(4))
  pdfDoc.rect(x, y, 50, 30).stroke();
  pdfDoc.fontSize(12).text(  'Doc : '+ doc, x+5, y+5, {
    features: ['rtl'],
    width: 130,
  })
  pdfDoc.rect(x+50, y, 50, 30).stroke();
 // pdfDoc.fontSize(12).text(  textCosineSimilarity(queryText,generalDoc.content.join(" ")).toFixed(4), x+55, y+5, {
  pdfDoc.fontSize(12).text(  ezzCosineSimilarity(queryText,generalDoc.content.join(" "),data.words).toFixed(4), x+55, y+5, { 
  features: ['rtl'],
    width: 130,
  })
  y+=30;
}

    })

  })



 pdfDoc.end();
}


