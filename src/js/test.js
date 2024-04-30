//-----------TESTS D’INTÉGRATION (POST)-------------------
                  //***********il est question dans cette partie de tester l'api de la fonction
                  //***********rataché au bouton envoyé
                  //--------EN EFFET, IL Y A ENVOI D'UN OBJET ET REDIRECTION SUR LA PAGE "MES NOTES DE FRAIS" */               */
                  describe('Étant donné que je suis connecté en tant qu’employé sur la page NewBill', () => {                         //  Given I am connected as Employee  on NewBill Page
                    //  Définir le stockage local fictif comme employée pour tous les tests qui suivront
                    beforeAll(() => {
                      Object.defineProperty(window, 'localStorage', { value: localStorageMock });
                      window.localStorage.setItem('user', JSON.stringify({ type: 'Employee', email: 'a@a' }));
                    })
                    describe('When API is working', () => {
                       test('Ensuite, il devrait envoyer une demande de MOCK POST et retourner à la page Factures', async () => {     //  Then it should send an Mock POST request and return to the Bills Page
                        // Arrange or setup or configuration
                        document.body.innerHTML = NewBillUI();
                        const newBill = new NewBill({ document, onNavigate, store: mockStore, localStorage: window.localStorage });
                        const form = screen.getByTestId('form-new-bill');
                        const btnSubmit = document.getElementById("btn-send-bill");
                        // Mock functions (fonction simulatrice)
                        jest.spyOn(mockStore, 'bills');
                        newBill.updateBill = jest.fn();
                        // Mocked Data
                        const mockedBill = {
                          email: undefined,
                          type: "Transports",
                          name: "SIELINOU nOUBISSIE ERIC ROMUALD",
                          date: "2022-12-10",
                          amount: 150,
                          vat: "20",
                          pct: 10,
                          commentary: "Réunion mission Bolled",
                          fileUrl: "./justificatif.png",
                          fileName: "justificatif.png",
                          status: "pending",
                        }
                          //  Remplir les champs du formulaire avec des données simulées
                          screen.getByTestId("expense-type").value = mockedBill.type;
                          screen.getByTestId("expense-name").value = mockedBill.name;
                          screen.getByTestId("datepicker").value = mockedBill.date;
                          screen.getByTestId("amount").value = mockedBill.amount;
                          screen.getByTestId("vat").value = mockedBill.vat;
                          screen.getByTestId("pct").value = mockedBill.pct;
                          screen.getByTestId("commentary").value = mockedBill.commentary;
                          newBill.fileName = mockedBill.fileName;
                          newBill.fileUrl = mockedBill.fileUrl;
                          // Act (l'objet a tester) : form submit
                          const handleSubmit = jest.fn((e) => newBill.handleSubmit(e));
                          const mockStoreBills = mockStore.bills();
                          form.addEventListener('submit', handleSubmit);
                          userEvent.click(btnSubmit);
                          //  Assert (résultat atendu) : mocked function
                          expect(handleSubmit).toHaveBeenCalled();
                          expect(newBill.updateBill).toHaveBeenCalled();
                          expect(newBill.updateBill).toHaveBeenCalledWith( mockedBill );
                          expect(mockStoreBills).toBeTruthy();
                          // Assert (résultat atendu) : returns to the Bills Page
                          expect(screen.getByText('Mes notes de frais')).toBeTruthy();
                       });
                    });
                    describe('Lorsqu\'une erreur se produit sur l\'API de requête POST', () => {        //  When an error occurs on POST request API
                      test('Ensuite, il devrait avoire en console un message d\'erreur', async () => {      //  Then it should console a message error
                        // Ararange or Setup or configuration
                        const root = document.createElement('div');
                        root.setAttribute('id', 'root');
                        document.body.append(root);
                        router();
                        window.onNavigate(ROUTES_PATH.NewBill);
                        // Mock functions : mockStore.bills and console.error()
                        jest.spyOn(mockStore, 'bills');
                        console.error = jest.fn();
                        mockStore.bills.mockImplementationOnce(() => {
                          return {
                            update: () => {
                              return Promise.reject(new Error('Erreur 404'));
                            },
                          };
                        });
                        const newBill = new NewBill({document, onNavigate, store: mockStore, localStorage: window.localStorage });
                        const form = screen.getByTestId('form-new-bill');
                        const btnSubmit = document.getElementById("btn-send-bill");
                        // Act (ce qu'il faut tester): soumission du formulaire
                        const handleSubmit = jest.fn((e) => newBill.handleSubmit(e));
                        form.addEventListener('submit', handleSubmit);
                        userEvent.click(btnSubmit);
                        // Assert (Assertion: c.a.d ce à quoi on s'attend)
                        expect(handleSubmit).toHaveBeenCalled();
                        await new Promise(process.nextTick);
                        expect(console.error).toHaveBeenCalled();
                      });
                    });
                  });