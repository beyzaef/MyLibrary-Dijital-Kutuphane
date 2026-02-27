1. **Üye Ol**

     - **API METODU:** `POST /auth/register`
     - **Açıklama:**  Sistem, yeni kullanıcıların platforma kayıt olabilmesini sağlamalıdır. Kullanıcı, ad, e-posta adresi ve şifre bilgilerini girerek hesap oluşturabilmelidir. Aynı e-posta adresi ile birden fazla hesap oluşturulmasına izin verilmemelidir. Kayıt işlemi tamamlandığında kullanıcı sisteme giriş yapabilecek duruma gelmelidir.

   
2. **Giriş Yap**

     - **API METODU:** `POST /auth/login`
     - **Açıklama:** Sistem, kayıtlı kullanıcıların e-posta ve şifre bilgileri ile giriş yapabilmesini sağlamalıdır. Girilen bilgilerin doğruluğu kontrol edilmelidir. Bilgiler doğruysa kullanıcı hesabına erişebilmelidir. Hatalı girişlerde kullanıcıya bilgilendirici bir mesaj gösterilmelidir.

   
3. **Şifremi Unuttum**

     - **API METODU:** `POST /auth/forgot-password`
     - **Açıklama:** Sistem, şifresini unutan kullanıcıların yeni bir şifre belirleyebilmesine imkân tanımalıdır. Kullanıcı e-posta adresini girerek şifre yenileme talebinde bulunabilmeli ve şifrelerini yenileyebilmelidir. Şifre değişikliği tamamlandığında kullanıcı yeni şifresiyle giriş yapabilmelidir


       
4. **Çıkış Yap** `POST /auth/logout`

     - **API METODU:** POST /auth/reset-password
     - **Açıklama:** Sistem, giriş yapmış kullanıcıların hesaplarından güvenli bir şekilde çıkış yapabilmesini sağlamalıdır. Çıkış işlemi sonrasında kullanıcı hesabına erişim sonlandırılmalıdır. Kullanıcı tekrar işlem yapmak isterse yeniden giriş yapmalıdır.
  

       
5. **Kitap Ekle**

     - **API METODU:** `POST /books`
     - **Açıklama:** Sistem, kullanıcıların yeni kitap bilgilerini ekleyebilmesini sağlamalıdır. Kullanıcı kitap adı, yazar, tür ve diğer gerekli bilgileri girebilmelidir. Eklenen kitap sistemde kayıt altına alınmalı ve listeleme ekranında görüntülenebilmelidir.
   

       
6. **Puan Ver**

     - **API METODU:** `POST /books/{bookId}/ratings`
     - **Açıklama:** Sistem, kullanıcıların kitaplara puan verebilmesini sağlamalıdır. Her kullanıcı bir kitaba yalnızca bir puan verebilmelidir. Verilen puanlar kaydedilmeli ve kitabın genel değerlendirmesine yansıtılmalıdır.




7. **Kitaba Yorum Ekle**

     - **API METODU:** `POST /books/{bookId}/comments`
     - **Açıklama:** Sistem, kullanıcıların kitaplara yorum yazabilmesini sağlamalıdır. Yazılan yorumlar ilgili kitabın sayfasında görüntülenmelidir. Kullanıcılar  kendi yorumlarını düzenleyebilmeli veya silebilmelidir.
  

   
8. **Okuma Durumu Güncelle**

     - **API METODU:** `PUT /books/{bookId}/reading-status`
     - **Açıklama:** Sistem, kullanıcıların bir kitabın okuma durumunu belirtmesine imkân tanımalıdır. Kullanıcı kitabı “Okundu”, “Okunuyor” veya “Okunacak” olarak işaretleyebilmelidir. Seçilen durum kullanıcıya özel olarak kaydedilmelidir.



       
9. **Kitap Bilgilerini Düzenle**

     - **API METODU:** `PUT /books/{bookId}`
     - **Açıklama:** Sistem, mevcut kitap bilgilerinin güncellenebilmesini sağlamalıdır. Kullanıcı gerekli gördüğü alanları değiştirebilmelidir. Yapılan değişiklikler kaydedilmeli ve güncel bilgiler sistemde görüntülenmelidir.
  



10. **Kitabı Sil**

     - **API METODU:** `DELETE /books/{bookId}`
     - **Açıklama:** Sistem, mevcut bir kitabın sistemden kaldırılabilmesini sağlamalıdır. Silme işlemi onay gerektirmelidir. Silinen kitap listeleme ekranında artık görünmemelidir.


       
11. **Filtreleme**

     - **API METODU:** `GET /books?genre={genre}&minRating={value}&readingStatus={status}`
     - **Açıklama:** Sistem, kullanıcıların kitapları belirli kriterlere göre görüntüleyebilmesini sağlamalıdır. Kullanıcı tür, puan veya okuma durumu gibi özelliklere göre filtreleme yapabilmelidir. Filtreleme sonucunda yalnızca seçilen kriterlere uygun kitaplar listelenmelidir.

       

12. **Kitapları Sıralama**

     - **API METODU:** `GET /books?sortBy={field}&order={asc|desc}`
     - **Açıklama:** Sistem, kullanıcıların kitap listesini farklı ölçütlere göre sıralayabilmesini sağlamalıdır. Kullanıcı kitapları isim, eklenme tarihi veya puana göre sıralayabilmelidir. Seçilen sıralama biçimi liste görünümüne yansıtılmalıdır.
