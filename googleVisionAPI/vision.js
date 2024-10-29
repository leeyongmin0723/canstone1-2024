VISION_API_KEY = ""

let imagestring = '';

function processFile(event) {
    const content = event.target.result;
    imagestring = content.replace('data:image/jpeg;base64,', '');
    document.getElementById("gimage").src = content;
}

function uploadFiles(files) {
    const file = files[0];
    if (!file.type.startsWith('image/')) {
        alert("이미지 파일을 업로드해주세요.");
        return;
    }
    const reader = new FileReader();
    reader.onloadend = processFile;
    reader.readAsDataURL(file);
}

function analyze() {
    if (!imagestring) {
        alert("먼저 이미지를 업로드해주세요.");
        return;
    }

    const data = {
        requests: [{
            image: {
                content: imagestring
            },
            features: [{
                type: "FACE_DETECTION",
                maxResults: 100
            }]
        }]
    };

    $.ajax({
        type: "POST",
        url: 'https://vision.googleapis.com/v1/images:annotate?key=' + VISION_API_KEY,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8"
    }).done(function(response) {
        console.log("분석 결과:");
        handleResponse(response);
    }).fail(function(error) {
        console.log(error);
        alert("이미지 분석 중 오류가 발생했습니다.");
    });
}

function handleResponse(response) {
    const faceAnnotations = response.responses[0].faceAnnotations;
    if (!faceAnnotations || faceAnnotations.length === 0) {
        console.log("얼굴을 찾을 수 없습니다.");
        return;
    }

    faceAnnotations.forEach((face, index) => {
        console.log(`얼굴 ${index + 1}:`);
        
        const joyLikelihood = translateLikelihood(face.joyLikelihood);
        const sorrowLikelihood = translateLikelihood(face.sorrowLikelihood);
        const angerLikelihood = translateLikelihood(face.angerLikelihood);
        const surpriseLikelihood = translateLikelihood(face.surpriseLikelihood);
        
        console.log(`  행복: ${joyLikelihood}`);
        console.log(`  슬픔: ${sorrowLikelihood}`);
        console.log(`  화남: ${angerLikelihood}`);
        console.log(`  놀람: ${surpriseLikelihood}`);
    });
}

function translateLikelihood(likelihood) {
    switch (likelihood) {
        case 'VERY_UNLIKELY':
            return '매우 낮음';
        case 'UNLIKELY':
            return '낮음';
        case 'POSSIBLE':
            return '가능성 있음';
        case 'LIKELY':
            return '높음';
        case 'VERY_LIKELY':
            return '매우 높음';
        default:
            return '알 수 없음';
    }
}
