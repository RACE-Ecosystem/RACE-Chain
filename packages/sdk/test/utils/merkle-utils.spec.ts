import { ethers } from 'ethers'

import { expect } from '../setup'
import { maybeAddProofNode } from '../../src/utils/merkle-utils'

describe('Merkle Utils', () => {
  describe('maybeAddProofNode', () => {
    // Test taken from opBNB testnet withdrawal.
    it('should add a proof node when final node is inside of a branch', () => {
      const key = ethers.utils.keccak256(
        '0x5cd60ecef836e75dd12539abe8ad5f4ba0dc4fcaae2c45024c69bd9e20746eba'
      )
      const proof = [
        '0xf90211a0feb6c6afca5ea568e0b7183d7292c112e9d28a1c846d889636d5c8822463aa77a0df719a24d8049d04a47e0e07ba493110fed0665d897c0ffdb05a7ce474782026a01bec363c069dc337ce16b4ca5cffa11d20e305fd7dcf6d87547b151c31aabf0ca00583d5a451bfa01f5e51d992e129ee17e65adda9495bda77898187484625aa9ea0bd9fef27cd52c2721e519bcd40c63a818095374e505a3bbd88db29c6c4521982a009a31937313c5b2bc06da6fec4075110f19526a9dbde3629ebe36aa8cd8e0851a0555f89002a34f6570bab438e69c5d8b855f2664e31f5dd59b807d0956577cc81a07e6f59ec99405b7afa436bf62abd098a85b43861fd3a9da3214a5d46b2d12543a03e7e883b0406cb781e5bf2a71cafc02ebbcdb0684ac03439633faf339d1259e2a0fa154fcf0bedd25aacac74e9864e4b96742c3d06f58c170cd320ade69db16c88a07e34154a031da5e50a3886efcb15c6681deeb20832726f083f80b03678b56d33a0d24408a39fb57838fdfe85c68f7eac74daab709ec3c22dfd0a579c1dbd64861aa093c1837ab2907fc51de7e918b81b997d60a6c8a18e3538720ee0d0f369530c26a0fca1af24293865f21d18d5eb823e0ecc007306823864f11d59c1c5c370fb22c2a0de8c894b5067d637df401aa6b963a3fc52b774abbedf6688e25bbf9a29672b7ca021c85d42de67601599e605d9ed1257451d1ce403d2478496d0a99d60db643d5280',
        '0xf90211a02288f14667ef872b449e0f0f5526c2ad3634dcdb7376616d18fd87f6af9293bfa027223b95acda1508dbc42caac8edfb422759eedd13628e4dff0c5bf79d275182a0352a96940c817156a6e33c6f6cb2010ac216296f6e912c335982ba75ffb11898a0c3b7339a174d0a5fd842d3bb946a2ba6d9c1088215d9c3f56449af4dabb59e1ca03b331c72db0a3e0b51167ecb4d0ee76126181e3a54718e7cdefbf89ae0ae0d7ea03f162cadc26daa12d91e9ba459c9e61008ef57314e9cb810f074a878f2b81910a00dc670d0489ec214e2a636274d1e8b2df9db343218503ae2bf7ed868d8ab553fa0bffdd8cf5fe58452a64254f44e28ecd886964898fbab68711749423478d9c94ea0ca722fcaddd052f5a8ddce25c0c4161cd9e5552a0697ceccba540b0520cfcb61a0ffc0036ebf8ed2d9603de8c22d36cdc3fb451dd92a23adefe5593a4d8a12299da0bff43610f0c3d44e73e741d58f34f4d8e25aa3f67e0796241210bf321c2f1117a0341dcdbf2722bd7eacc3af46b6a9d80bb775dace93808a6737a1e135b9b225f3a07b3c3ec4c199c11374ba2dd28227e8c1efdbd8cb065768eff27e3918647eaccfa0e5a903a66eedfe8ea6d28a0f93cc91fc5f00f612a54aeeff100dafe84182a815a0203b138ec5130556a58d06184fdc399cb726954d28fe9fc68131f23d211382f5a057e92c1aec0a5b4e723cbbb3928d1008c9a9b4a26206656fccf70c14136a77de80',
        '0xf90211a0437a65e2661356d938aa5321927d85003770566f25f121ec0dba4ad4acae9a8ca04acf516468076bf35f8c10e6aa904612fe08fcfba5c7b76bd87a5fe38e212c4da08db4fa1d774e1653468078c4c6a26cc6236025d6ab88dd1c02dae7c8bc7b19f7a03fb292d186e2d63e163788b3af313403cd12bc4b839037be4ad15a6fbbee217aa0dc569eab6a0b0a1d1dd7d12a24512bff7d4a6f5dc55a5a2dea31ed1a5415d383a0e4eaab256b73b4abc3402f44b6fa90a0854b733cdd5b884915ae8c07f5c78002a075ccef6818cc6c2870a70a0b41e3904ba2355937e028b02cb54a7ab321492357a0b059014d41d68c6c28b7de8f06b57c015210167d64c8589f9d7801dd4f025a60a07bf03f4912eaba2dd295222c1e01c1ddd7baedad61cf90d4e5987fc7ae1c6beaa0309d5aff3d1194cf259389cbb365e43548291aa9125d0550ab4908d1cc958844a0ff3fa5bba3bd95b08506336101c1c71cb920dd3ee68d8120654dac8f4b05d390a03a7b3de7b7476d9bf665396b718a28f8d746828bbf51a396e43669a4c90ca770a0913bc7b7ef04689a19cebf2c785f4eea68ccf9c97be94bb5bdd1346d4b145147a0cc21ab258bc2d961534438ddbbf185de30f8387acbc40f89857d88a23f90047ea0cf8b6876bd0cfd19ddd39fcfe88470d76757f64ba8496cfc382c92ed65706586a051de24dd2a27ffce89bb1dfcd6aa33469a91b50c4332ff9ef45d3cc917613a5c80',
        '0xf90211a00aaeb3f8caea8f7167815fcdf1470777f7e100c781bc9ed79afefac295bb0d03a04b9f1d4ade00185fc62732b28abfb243afff140ebfa034daa4f139e0015a2195a0f9608d7d4346638e5ad4219ef6ea0769aa9fdb4bc6207831cf0f64854b072c2da0b953f4ee5f8ae17d9da8e3c1efaf9a822d0301dab05cae4b776fbd666fce8158a0bd8460bbbcfa3e02af0909445883176e3b65c85a63c6f91c2994fa2979228726a024f9c1c9952c2b6edec11955b50eaccd1ef44099db309f807f85aa4c4130b31ea056ad08d1e812df59fb54d2b847b1e7fa0872aaa1f3ac8f4e314d6893baece56aa02ca9f7cf8514dcca9401081f94b824f03b4d74dc690dfeed6779ddee4a9ad72ba050dffdadd79fbb8d857ad658864cd9cb19e69c73f8ba9c241fc2b451e2124320a00377a910bb501d1b22b7b03a3fa60aa47facf33515c10b0742fb76bd5a3d7a6ca0abcffd053ac378f2aa4d90e95c64dd7cc450fe6f961f9f55722cc49ef7b47f7ba042a8b3431675d5909bad710d519dd2c5d3287f3af8641122cce53b137087ce6ba0b77542431b232d0aabbbdf27e1c1adab761e144d396d0658ec1a84a712906a73a099ca74decdad4e079c0d1f35c8da403acbe65bf284253dab1be788f1808687eba06d866839d5ce08a75b3c8a2383b7eec6120ab32c7dfbe9b036831fc3101c8250a0fd315d671bf51da89b2db014d0f199be522fbf8e19d0276d0a14a1c66c1df8ac80',
        '0xf901f1a0d6228395f59dea0ead05458d95d54c315c7feddf6416bb41aed62dc165446a6ca051e1ecb5424d948d386c0d291bb674fac4c47349f67e40a77850f54254b612b5a0e3b1d858fc2bb8001052eb3a36c9e2bea2966c795848aff0e5fb3cd779cfb565a0046a3c69a3639aa8bc1b3cf2c052d54424a88d2ea90a6388595b160ef5ef161780a0b2b1a778cbd8a3257ff7114116d892491a3ab148be723e22262b842680a9b29ea026da2284e756fcade15d922c0b8f6282a008e1c842e5030a307b3ea2e9a55726a026c0862e8e9e06ddef9ce37044fe2228a3ba9863faaf0cf1ad0863d41f7d7f13a0bcfbf48375296ad05ade4710ffe7e2b419fe246623369f7a6a4fa6f720bb185fa0d982dbbef7671cf7add6efd8612d47477b77f40d62e11983fe4478e959c0a86da0b3bf440462efb53c7056f5ff3ea134a072363a95a15a6945b83e416e6adee245a00396e89cb82998271f55ef0e892d456a7bbf624c23bf751f1ea2da6a7690be42a06f2588a03a07740fe4d300795096252abeb6b984e41b4f7027df84c1c520ea84a0ce163ce486c3de11ca2f6656f5dcf82e62496cb0d5472e042dede34d0e1aedd8a0fec8a8bfbf3e3418c4730c3c7c047cd73695c4c429f6ec6babc7165b9b27e635a002711d0ce2951376bac13daf1d3bcf359a90f68bc804b6b2b2e9efe09a8157af80',
        '0xf89180808080808080a0326fe6fc4a847e4db1144153b15d0d3811f0317239f2885cc2a383825ccb1d8480a04455f6e0d1f8a2022ea33d5e6a537e384483dfccd19d07d21047e9b264b56e3c808080a06174ffa3ff6accab10abb5d61000db050324c608b10c0344a3eec6fa0107a079a0d494a04c23ba556fc3bdbe234562fe6825d55f3aaaa81e43415b8070a733d0bd8080',
        '0xe482000fa03cb626e2849a157c57ca2e62c3dd139cf803efe281f5b6331b3ba92280dd8c42',
        '0xf84d8080808080de9c332c35a4d03ec6ab9b3ffd06c69652ce8e02ff95537f98b7a0feb29c01808080de9c36620d27102d4799d259fe08f690c0a21b80d0a1a903db682417a23f0180808080808080',
      ]
      const modifiedProof = maybeAddProofNode(key, proof)
      expect(modifiedProof).to.deep.equal([
        ...proof,
        '0xde9c36620d27102d4799d259fe08f690c0a21b80d0a1a903db682417a23f01',
      ])
    })

    // Test taken from opBNB testnet withdrawal.
    it('should not add a proof node when final node is a leaf node', () => {
      const key = ethers.utils.keccak256(
        '0x55b08006167f308d31af5ea9f302384725df906124e39e0eb2c6d040498e0fae'
      )
      const proof = [
        '0xf90211a08c7918779c1c4435737b269573de96df28e1ec8c5847d7317906971b4c5fa73fa018679d112e60f815616a167692ea7d821691f34bed06df12c7b121a4c7b8384ba06b0a09649c9e7df1bde1c7448243c954dfecae8301b7f6bbe7d8f0b781733194a0258988e63a01754eafaffa3837ccc321c4f99d50869d04c09e7ab587988ecfa6a0a5b325ae646fd16ad7daac9d6da2ea244d456fa1a219f828cb9a5785f01bbf4ea0532b1427977ae09ee5344667910500207fd500912f9e1c6f5e7aa6b8b333a717a04a32b16d0d56f217216a9dae9eea953883ff3bcf1a9578d60d6bb28bbf4b6655a009e8cabb94c504eeb5cf15a151ed4b99be678bf969ee30be5d8aaf1312210079a0938dedf6ad32b04a9a2da09f29e481c51d7cf440d62651ed570355e12a4858d8a0b6bae212efc7179842abc76e9d6b2850b05336720b81dac467e942f7f6cd6b9ba0be45a8205c8c75ebe83c10cc9e87a597820d7e3ca691f9d1549e12a6f050a296a0c65bd95874adb4054ae8b346f2d2ccc88e76555c662b230d62072db36933508ca0e21442e3384b11c414e4a6bc2d56e71dbbbc672c38ac00bd63386ad55c590955a0d3d178f5be5f808d97ce22d48adce909ecf326cc5d9a0e7b64af616ca2d3e12ca09475833e7206cd83f7301f995617825f6d7050c782e17495ce5eb0556c2b68c4a09638ed778938e150e4c68cbcaf9bd47f97e1a6a6d6d2bbf9bc516450166a1ed980',
        '0xf90211a0a3f8f3795f08496d4cd1b0c054c337d10d28fa2e9725162da7714c20d3b30c88a05856b0aa4c58cd715545c05ddb8bd93835dcd0ecbc7c2b139266af1c1850a671a000b3e2386218f9308469c731f6d53d5fb27512082390826956c8a234854a88aca0e525d6f4fa38fec4694f5cdb589156dc3a4d829861e1228b502c0130a4834ceaa0a414e804e76eb8863d1804ae04189237119b0415bf57c8a6a4ab176ad9f78eeca022aa4baf04a82bb83148c6ff6261dec1165f5d2f9bdf0ce73dfb2c9719fb8597a06fe7a289928f7fbd860aafb95945dcc2699bf7bf2010d6aa83b9f49308e968c9a008d5e746de17a948d6e7fc864286215d008e7f2d592cf7269df4dab0a3486215a0c39c7aa088d057db66179d7354b3f0d48f6d3ed2e62f8a840d9117b7b66a64bda0dd4ccdc76f721cf04cdf14d1d8a1821501d89c3d44ed5ed92b5a820431b36990a06c89982d73cc213516be264bb2fb6c969131f542afbc460ff781b839290e42f8a09954b3cbc392cdefb5664bc8483e1400def7846c631728d814b1a163ba871c44a0215b32a1491899a86be9c986dd695612a3964235b20e73158e501e6005cec689a0c1a8d7e66e95c7b661018c01dce2732f0f88614caa69e0e0848f5a750c8a9bbaa01aab317da329eee7bcdb91ee23d9a776f2a662bc672cc89f9d8f1c40cf94a4d5a013b5fc28d7d795f1203db98a7f49493ec4dbc6e7f19415131fd724274d53b93b80',
        '0xf90211a099cf6b57cf52d79d997c6c7cacc880d9eecba4d91b711e94567d153a4e7a0586a05dd28dc2c3001cd399773fec132570d32a88cf439c15d8ed1750692892019bbda0419a8369667afcc1bd0eb25aa2ee01aa9914389f1c4c5b8cfdb76c7387b1efeda0c31b4168d817e9e6c1f8d9241cb61d3e40417396438799cae60b21036c569585a02cb6faef5768eb7381530c01c30a69ee9d6b74b63ad7875df8dce0d3f9e33beea0722b13f67dcc8e022e2f2f6cf42b697330425f910499f9f69455e9b9dc7a5696a0c2da3ee274178cd500418aa82c86116f8a19c03f50680589689cd76c526885baa0de4fcbd8ef4edef419cac8f12a67f76c27a7d53a47d0408251c89b191599e2a6a01bec2c60b7ab411ffe01ef36723a82b1e36df58759e4356b90f0b939cf9f7feca0823b67e452e64a3986da2836b6398bfe6dd6257b1313b649bd38b8109b442e86a0fe8fd7cf12be37c649531fa445116c53258d76664ba95b84f6adac356015f469a04d68070a9bd5b183068eafc1edfec122dba0ded10725ebc468cb0b7b7fba15d6a051b612dfba41f35f8c827ee18387bf6e3316cb8494fd30d88a091b5405bc5d8ca01c622f8ce84c20a5d1055a984e405638509e2e8683d1fa89725b4855500f353aa01e795b4bd4df111c9528d22c7964d89f96cdb5f7217fda91132b10b30782965fa0d91eacec2f75501bb1e9c7c3dd7d2cdf12d206627f096da1408573f2775646ce80',
        '0xf90211a03b7d6150ad44f8399b7fa60d27034db408b0fe2f42770312dbc12220205ba6b2a0c34225fedb6a5a5351429e52c6dc637abed3bde536318fbb9e592630dbaa9ff8a0a3a4cbf9ee86518067c263c9ea3c59683306519f5ad518f8c7ccb298e8b405dda0bb9847a6a1e58287f2f5e0dd2fc9a7e78118639f1d9768d970114fd72cf4bb94a00bd41abbd004fc6aabb2ad6ca5ad6c8adc9188263b41e3c5c1c640bc6cdad909a01ddb2f8f80a1856248f813e3f066f12a0699c83c7a620a3a156f8d7320887901a0716be43af95da7bb5b22ffd86b67790da8f6470bdb771a1c72c3d8b918101f77a08e844b3e7b41dbf69f7cb59df673d21dd0d0679b387d136e77e91e01c2aa83cda01086f25f4f678183dc4a5398a0c608f28578619d5ef25890457f266dfd0b2b45a05c463dd5c575e7440ceea9322b3a50fc1111f45f15d8a2bb822efe430cb321e9a0deb669961500f680770e94ee2253cd5fbb20d30a0d2cb10a35efd0c1a7827ebaa090fb4c646e0a7d00b427d27372532e003f6e430fef4a896b26da3d334b5e35bea0e00315beb0ceadcbfe33727cfdb08d98c86dca534ceb50e799f2bf914e18da66a0b32fcca5247e924812fedc00a2f6c72ef36dfb28896a315bbbad8f7dac09623ca07e5d50949d89b497620383abcc9fe952911f4821b50184261c3dda6e46a0b815a039921c389fef00713e4ad8897bc5c68781fee90d0873a42cfd814b8709152c4380',
        '0xf901f1a01dd4ceeb1ab5bc49adb270f4c031783adcc6d4b8b2c874778310b84188fe9b64a0747c08e80562666c517c00dfb2648e71273377b1412b56ad5e45f633f952229aa0991ce5972ae42c944f7d7fafb8cf01913a0658efd48ea4beff7dfc4c45c0f21aa0fe8c9b0e45134639ea41c880910a73d49d3c5fb8e3cf003eda7ceb48891b9d12a0d5748723a79117e595d805b90c5da4f28a88ca06ab8a3b540509fc5f74487be2a04724502db500742f7bf9f64bd6d0c9cecb150dcacd8f41b235baa3228120c3dc80a05ba19409d69154ee9397c0451ce8fe478a4a17097c49df7f25aa349243522455a01f16b5317ef849b7d520e74f02e3a1b5d3aa5454a009c398f6917ef72d12fd3aa0354fbfecc5fe46c76395042141308381ef0f59e0ffae159d1758b287dcd92c2ea065df8dd7ad7fe8accdc96ae5bf97802b1425dec3cef9c148f49c736dc8151faaa0eb440cd657329946458789ab7ba02df5dcd77a28095009305001fe5124424079a05fa06e6354a138012417afd550c71a9a08164bceccf652f150d1ea6a31f89d20a06cc7b02dce36338aa84041a725bb47b87bc93090b676776b53c0a7c654d93361a02c4ec483c0b8b4d148c133e2ea471b3432d310ed7c43d2b983203bd08adbb3eda025964bfbdd4d19d5d5f094ac4ca8bb2476047f3c5328cb1c84a24ee5bea5fdcb80',
        '0xf851808080a045d583df49281f7f8c545ab91f4d35ba48873cc4da6deb2c0703135959fc8ec080808080a0ca2836f17b4c1af21e2531f7036a069ba8ef535650495820731ca669590dfddb8080808080808080',
        '0xe09e202ec4eafbdfe1b7f218e5f087854c923c7f41b85d3ada15c32bef29588a01',
      ]
      const modifiedProof = maybeAddProofNode(key, proof)
      expect(modifiedProof).to.deep.equal(proof)
    })

    // Test taken from MerkleTrie solidity test suite.
    it('should not add a proof node when the value itself is inside a branch node', () => {
      const key = '0x6b657933'
      const proof = [
        '0xe68416b65793a0f3f387240403976788281c0a6ee5b3fc08360d276039d635bb824ea7e6fed779',
        '0xf87180a034d14ccc7685aa2beb64f78b11ee2a335eae82047ef97c79b7dda7f0732b9f4ca05fb052b64e23d177131d9f32e9c5b942209eb7229e9a07c99a5d93245f53af18a09a137197a43a880648d5887cce656a5e6bbbe5e44ecb4f264395ccaddbe1acca80808080808080808080808080',
        '0xf839808080808080c9823363856176616c338080808080808080809f31323334353637383930313233343536373839303132333435363738393031',
      ]
      const modifiedProof = maybeAddProofNode(key, proof)
      expect(modifiedProof).to.deep.equal(proof)
    })
  })
})
