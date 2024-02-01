import { 
    bootstrapCameraKit,
    createMediaStreamSource,
    Transform2D,
} from '@snap/camera-kit';

(async function(){
var cameraKit = await bootstrapCameraKit({ apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzA2Nzk0MzIyLCJzdWIiOiI3ZGI2ZTg2MC03MjBlLTRlZDQtYjM5Mi05NDhmZWIzNjg2ZDN-U1RBR0lOR35hOTJmYjc5Mi04YmU2LTQ3YTUtYWMwZS0xOTc5Y2MyYzVhYjYifQ.vXQ3ACjPs64dab0cl04AitwS0adHOtHVfS1ZgSF8cso'})

const session = await cameraKit.createSession()
document.getElementById('canvas').replaceWith(session.output.live)

const { lenses } = await cameraKit.lensRepository.loadLensGroups(['289ecde0-ae5e-495d-9a83-a3b6d89c632c'])

session.applyLens(lenses[3])

let mediaStream = await navigator.mediaDevices.getUserMedia({ video: 
    { facingMode: 'environment' } 
});

const source = createMediaStreamSource(mediaStream,{
    cameraType: 'back'
})

await session.setSource(source)

session.source.setRenderSize(window.innerWidth, window.innerHeight)

session.play()
})();