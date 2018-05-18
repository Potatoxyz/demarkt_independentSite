$(function () {
    const productList=[
        {id:1,src:"./images/1.jpg",title:'Demarkt Cotton Linen Cosmetic Storage Home Decor Storage Bins Basket Organizers for Baby Toys (Polar bear)',link:'https://www.amazon.com/Demarkt-Cosmetic-Storage-Organizers-Hedgehog/dp/B078N4D8BG?th=1',des:['Material: high-quality linen fabric,environment friendly,durable.','Back waterproof coating, waterproof, resistance soiling,easy to clean.','Foldable storage basket,save space,small volume,the handle on both sides,convenient to move.']},

        {id:2,src:"./images/2.jpg",title:'Demarkt Novelty Large Capacity Milk Carton Pencil Cases Cosmetic Bag',link:'https://www.amazon.com/Demarkt-Novelty-Capacity-Carton-Cosmetic/dp/B0756F649B',des:['Material: PU leather.',"Lady and girls favorite.",'Dimension: 20x5x6cm/7.8x 2x 2.4inch','Creative Milk Box Design, Durable, Multi-use.','Package includes: 1 * Pencil bag']},

        {id:3,src:"./images/3.jpg",title:'Demarkt 10 Sheets New 3D Black Lace Printing Design Nail Art Stickers Decals Nail Tips Decoration Tool by Demarkt',link:'https://www.amazon.com/Demarkt-Sheets-Printing-Stickers-Decoration/dp/B01CHFHZAI',des:['Note:10 sheets Nail Art Stickers (style random)','Surface smooth,Non-toxic and tasteless','Make you more charming',"It's your gift for your Lover"]},

        {id:4,src:"./images/4.jpg",title:'Demarkt Cable Clips Cable Cord PC Electric Charging or Mouse Cord Holder 5pcs',link:'https://www.amazon.com/Demarkt-Cable-Electric-Charging-Holder/dp/B06XW345H7',des:['Single diameter of each about 3cm /1.2 inch','Sticky Fixing Stretcher Universal Desktop Wire Fixing Clip Clamps, used without limitation of address','The hollow groove shape is easily fixed all','Suitable for installation on the table surface, table legs or coffee table, easy to use']},

        {id:5,src:"./images/5.jpg",title:'Demarkt Mechanical Kitchen Timer/60 Mins/White',link:'https://www.amazon.com/Demarkt-Mechanical-Kitchen-Timer-White/dp/B00YX3441G',des:['Counts down from 60 minutes to 1 minute','Features an easy-to-operate mechanical pointer','Large, easy-to-read numbers on the dial','The perfect compliment to any Kitchen!']},

        {id:6,src:"./images/6.jpg",title:'Demarkt Word SLUT Black Double Layer Hand Spanking Paddle Leather Sexual Paddles Sex Toys for Couples',link:'https://www.amazon.com/Demarkt-Spanking-Leather-Paddles-Couples/dp/B01LXHCO88',des:['Made of high-quality PU material, non-toxic, no odour and no fading, flexible sturdy and smoothly.',' Size: 12.6*2.36 inch.',' Amazing design for you and easy to use. Nice comfortable touch feeling,please feel relieved about usage.','The Spanking paddle can spice up your sex life, give you a different sexual fun.']},
        {id:7,src:"./images/7.jpg",title:'Demarkt Washi Tape Cute Lace Flower Clear Decorative Tape Masking Sticky Adhesive Tape for Scrapbooking and Phone DIY Decoration,3 Roll',link:'https://www.amazon.com/Demarkt-Decorative-Adhesive-Scrapbooking-Decoration/dp/B078SV49R5',des:['Size: Long100 cm , Wide1.8 cm .',' Get a lot of DIY pleasure and a good mood with these apparent cute lace tape.',' Ideal to used to decorate cell phones, laptops, computers, PSPs, MP3s, phones, cups, table chairs, photo albums.','Fashion cute design Self-adhesive lace style tapes for children, girls, women.']},
        {id:8,src:"./images/8.jpg",title:"Demarkt 2pcs Women's Nail Rings Flower Design Finger Tip Rings",link:'https://www.amazon.com/Demarkt-Womens-Flower-Design-Finger/dp/B00LJN5MX2',des:["2pcs Women's Nail Rings Flower Design Finger Tip Rings",' 100% brand new',' Fashion design','package : 1 PC']},
        {id:9,src:"./images/9.jpg",title:"Demarkt Light Guide Relax Sleeping Eye Mask Eyepatch Blindfold Shade Travel Sleep Aid Eye Cover",link:'https://www.amazon.com/Demarkt-Sleeping-Eyepatch-Blindfold-Travel/dp/B01DNC7KBI',des:["100% Brand New & High Quality.",'Help to sleep quickly,Travel Sleep Aid Cover Light Guide Relax.',' Essential for achieving restful sleep during the day.','Made of comfortable closed-cell foam and nylon.']},
        {id:10,src:"./images/10.jpg",title:"Demarkt Portable Zipper Eye Glasses Sunglasses Clam Shell Hard Case ProtectorBox",link:'https://www.amazon.com/Demarkt-Portable-Glasses-Sunglasses-ProtectorBox/dp/B072JMHYM5',des:["Size: 16x 4.5 x 7.5cm",'Zipper style',' Large capacity','It protects your Eye Glasses Sunglasses from Fingerprints, Scratches, Dusts, Collisions And Abrasion','EVA material']},
        {id:11,src:"./images/11.jpg",title:"Demarkt® Women Tattoo Pattern Knee High Hosiery Pantyhose Leggings Stockings Tights (Heart Mock Thigh Highs)",link:'https://www.amazon.com/Demarkt%C2%AE-Pattern-Pantyhose-Leggings-Stockings/dp/B00INTX1DS',des:["Women Tattoo Pattern Knee High Hosiery Pantyhose Leggings Stockings Tights (Heart Mock Thigh Highs)",'100% brand new',' package : 1 PC']},

    ];
    showDes=function (id) {
        var obj;
        $('.des-wrap .des ul').empty();
        productList.forEach(function (t) {
            if(t.id==id){
                obj=t;
            }
        });
        if(obj){
            $('.des-wrap .title').text(obj.title);
            $("#sb-slider li a img").attr("src",obj.src);
            obj.des.forEach(function (value,index) {
                $('<li>').text(value).appendTo($('.des-wrap .des ul'));
            });
            $('#buyLink').attr('href',obj.link);
        }
    };
    function getId(){
        var param=location.search;
        showDes(param.slice(4))
        // console.log(param.slice(4));
    }
    getId();
})