function drawCounts(data) {
	var dataTable = new google.visualization.DataTable();
        dataTable.addColumn('string', 'Species');
        dataTable.addColumn('number', 'Data count');

        for(var iter=0;iter<data.length;iter++) {
                dataTable.addRow( [ data[iter]['species']+' miRNA', parseInt(data[iter]['count'], 10) ] );
        }

        optionsPie = {  title: 'miRNA categories', fontSize: '16px',
			backgroundColor: '#EAECE7'
                        //backgroundColor: { 'fill': 'rgb(182, 184, 149)', 'strokeWidth': 1}, colors: ['#254180', '#3054a6', '#4970ca', '#6889d3', '#c7d3ee']
                };
        var vis = new google.visualization.PieChart(document.getElementById('tableIndex'));
        vis.draw(dataTable, optionsPie);
}

        function drawStats(data) {
                var dataTableStats = new google.visualization.DataTable();
		var dataTableStatsLine = new google.visualization.DataTable();
                dataTableStats.addColumn('string', 'Type');
                dataTableStats.addColumn('number', 'Count');
		dataTableStatsLine.addColumn('string', 'Type');
		dataTableStatsLine.addColumn('number', 'Count');

                dataTableStats.addRow( [ 'Validated Targets', parseInt(data[0], 10) ] );
		dataTableStats.addRow( [ 'Functions', parseInt(data[1], 10) ]);
                dataTableStats.addRow( [ 'Diseases', parseInt(data[3], 10) ] );
                dataTableStats.addRow( [ 'Regulators', parseInt(data[2], 10) ] );
                dataTableStats.addRow( [ 'Pathways', parseInt(data[4], 10) ] );

		dataTableStatsLine.addRow( [ 'Chemicals', parseInt(data[5], 10)] );
		dataTableStatsLine.addRow( [ 'miRNAs', parseInt(data[6], 10) ] );
                dataTableStatsLine.addRow( [ 'Regulators', parseInt(data[2], 10) ] );
                dataTableStatsLine.addRow( [ 'Validated Targets', parseInt(data[0], 10) ] );
		dataTableStatsLine.addRow( [ 'Functions', parseInt(data[1], 10) ]);
                dataTableStatsLine.addRow( [ 'Diseases', parseInt(data[3], 10) ] );
                dataTableStatsLine.addRow( [ 'Pathways', parseInt(data[4], 10) ] );

                var cssNames = {oddTableRow: 'testOddRow', tableRow: 'tableRow', hoverTableRow: 'hoveringTableRow', selectedTableRow: 'tableRowSelected'};
                optionsStatsLine['cssClassNames'] = cssNames;

		/*optionsStats = { title: 'miRNA Details' };
                var visStats = new google.visualization.PieChart(document.getElementById('tableTable'));
                visStats.draw(dataTableStats, optionsStats);*/

		optionsStatsLine = { title: 'Features', backgroundColor: '#EAECE7' };
		var visStatsLine = new google.visualization.BarChart(document.getElementById('tableBar'));
		visStatsLine.draw(dataTableStatsLine, optionsStatsLine);

		google.visualization.events.addListener(visStatsLine, 'select', selectHandler);
		var counter = 1;

		function selectHandler() {
		        var selection = visStatsLine.getSelection();
		        var message = '';
		        for (var i = 0; i < selection.length; i++) {
		                var item = selection[i];
		                if (item.row != null && item.column != null) {
					message += item.row + ' @@@' + '\n';
					if(parseInt( item.row, 10) === 0 ) { // chemicals
				                jQuery_132_172_latest.ajax({
				                        type: "POST",
				                        url: "loadSuggestions.php",
				                        data: {'idata': 555},
							dataType: "json",
				                        success: function(data) {
								drawOnlyChemicals(data);
								jQuery_191_1101( "#dialog" ).dialog( "open" );
				                        }
				                });
					}
		                } else if (item.row != null) {
		                        message += '{row:' + item.row + '}' +'\n' ; //+ ',column:' + item.column + '} = ' + str + '\n';
		                } else if (item.column != null) {
					message += item.row + ' $$$' + '\n';
		                        }
		        } // for loop end
		        if (message == '') {
		                message = 'nothing';
		        }
			//alert(message);
		} // end of select event handler */

        } // end of drawStats

	function drawOnlyChemicals(data) {
		var optionsChemicals = {alternatingRowStyle: true};
		dataTableChemicals = new google.visualization.DataTable();
		dataTableChemicals.addColumn('string', 'Chemical');
		dataTableChemicals.addRows(data.length);
		for(var iter = 0; iter < data.length ;iter++) { 
			dataTableChemicals.setCell(iter, 0, data[iter]['chem_name']);
		}

                var cssNamesChemicals = {oddTableRow: 'testOddRow', tableRow: 'tableRow', hoverTableRow: 'hoveringTableRow', selectedTableRow: 'tableRowSelected'};
		optionsChemicals['cssClassNames'] = cssNamesChemicals;
                optionsChemicals['page'] = 'enable';
		optionsChemicals['pageSize'] = 10; 
		optionsChemicals['pagingSymbols'] = {prev: 'prev', next: 'next'};
		optionsChemicals['pagingButtonsConfiguration'] = 'auto';

                visChemicals = new google.visualization.Table(document.getElementById('dialog')); 
		visChemicals.draw(dataTableChemicals, optionsChemicals);
		google.visualization.events.addListener(visChemicals, 'select', selectHandler);

		function selectHandler() {
		        var selection = visChemicals.getSelection();
		        var message = '';
		        for (var i = 0; i < selection.length; i++) {
		                var item = selection[i];
				if (item.row != null && item.column != null) {
					//var str = dataTableChemicals.getFormattedValue(item.row, item.column);
					message += "111"; //'{row:' + item.row + '}' + +str+'\n' ; //+ ',column:' + item.column + '} = ' + str + '\n';
				} else if (item.row != null) {
					var str = dataTableChemicals.getFormattedValue(item.row, 0);
					message += item.row; //item.row + ': ' + str;
				}
				else if (item.column != null) {
					var str = dataTableChemicals.getFormattedValue(0, item.column);
					message += '{row:none, column:' + item.column + '}; value (row 0) = ' + str + '\n';
					}
			}

			//alert(message);

	                /*jQuery_132_172_latest.ajax({
	                        type: "POST",
	                        url: "dbLookup.php",
	                        data: {'fromHome': message},
				dataType: "json",
				success: function(dataS) {
					alert(dataS);
					//var sessionVariable = '<?php echo $_SESSION["setChemical"]=?>'+message+ '<?; ?>';
					//alert(sessionVariable);
					//window.location.href = 'dbLookup.php'; //?<?php echo session_name().'='.session_id();?>';
				}
	                });*/
		} // end of selectHandler
	} // end of drawOnlyChemicals

	function drawUpstream(data) {
		dataTableOne = new google.visualization.DataTable();
                var numRowsOne = data.length;
                dataTableOne.addColumn('string', 'Regulators'); 
		dataTableOne.addColumn('string', 'Regulation of miR'); 
		dataTableOne.addColumn('string', 'PMID'); 
		dataTableOne.addRows(numRowsOne);

		for(var iter = 0; iter < numRowsOne ;iter++) { 
			dataTableOne.setCell(iter, 0, data[iter]['up_tf']);
			dataTableOne.setCell(iter, 1, data[iter]['up_regul']);
			pubmedurl = 'http://www.ncbi.nlm.nih.gov/pubmed?term='+data[iter]['up_pubId'];
			dataTableOne.setCell(iter, 2, '<a href="'+pubmedurl+'" class="embeddedAnchors" target="_blank">'+data[iter]['up_pubId']+'</a>');
		}
                var cssNamesOne = {oddTableRow: 'testOddRow', tableRow: 'tableRow', hoverTableRow: 'hoveringTableRow', selectedTableRow: 'tableRowSelected'};
                var total = Math.ceil(numRowsOne/10);
                document.getElementById('pageCntUpstream').innerHTML = total;

                optionsOne['cssClassNames'] = cssNamesOne;
                optionsOne['page'] = 'enable'; optionsOne['pageSize'] = 10; optionsOne['pagingSymbols'] = {prev: 'prev', next: 'next'}; optionsOne['pagingButtonsConfiguration'] = 'auto';
                visualizationOne = new google.visualization.Table(document.getElementById('drawTabs1')); 
		visualizationOne.draw(dataTableOne, optionsOne);
                google.visualization.events.addListener(visualizationOne, 'page', function (e) {
                               document.getElementById('pageNumberingTabs1').innerHTML = e.page + 1;
                });
	}

	function drawValidatedTargets(data) {
		dataTableTwo = new google.visualization.DataTable();
		var numRowsTwo = data.length;
		dataTableTwo.addColumn('string', 'Gene Name'); 
		dataTableTwo.addColumn('string', 'Entrez ID'); 
		dataTableTwo.addColumn('string', 'PMID'); 
		dataTableTwo.addRows(numRowsTwo);

		for(var iterTwo = 0; iterTwo < numRowsTwo; iterTwo++) {
			var entrezurl = 'http://www.ncbi.nlm.nih.gov/gene?Db=gene&Cmd=ShowDetailView&TermToSearch='+data[iterTwo]['entrez_id'];
			dataTableTwo.setCell(iterTwo, 0, '<a href="'+entrezurl+'" class="embeddedAnchors" target="_blank">'+data[iterTwo]['gene_name']+'</a>');
			dataTableTwo.setCell(iterTwo, 1, '<a href="'+entrezurl+'" class="embeddedAnchors" target="_blank">'+data[iterTwo]['entrez_id']+'</a>');
                        mirnaurl = 'http://www.ncbi.nlm.nih.gov/pubmed?term='+ data[iterTwo]['gene_pubId'];
                        dataTableTwo.setCell(iterTwo, 2, '<a href="'+mirnaurl+'" class="embeddedAnchors" target="_blank">' + data[iterTwo]['gene_pubId'] + '</a>');
		}
                var cssNamesTwo = {oddTableRow: 'testOddRow', tableRow: 'tableRow', hoverTableRow: 'hoveringTableRow', selectedTableRow: 'tableRowSelected'};
                optionsTwo['cssClassNames'] = cssNamesTwo;
                optionsTwo['page'] = 'enable'; optionsTwo['pageSize'] = 10; optionsTwo['pagingSymbols'] = {prev: 'prev', next: 'next'}; optionsTwo['pagingButtonsConfiguration'] = 'auto';

                var total = Math.ceil(numRowsTwo/10);
                document.getElementById('pageCntValidTargets').innerHTML = total;
		visualizationTwo = new google.visualization.Table(document.getElementById('drawTabs2')); 
		visualizationTwo.draw(dataTableTwo, optionsTwo);
		google.visualization.events.addListener(visualizationTwo, 'page', function(e)  {
			document.getElementById('pageNumberingTabs2').innerHTML = e.page + 1;
		});
	}

	function drawTopTargets(data) {
		dataTableThree = new google.visualization.DataTable();
		var numRowsThree = data.length;
		dataTableThree.addColumn('number', 'Gene Rank'); 
		dataTableThree.addColumn('string', 'Gene Name'); 
		dataTableThree.addColumn('string', 'Entrez ID');
		dataTableThree.addRows(numRowsThree);

		for(var iterThree = 0; iterThree < numRowsThree; iterThree++) {
			dataTableThree.setCell(iterThree, 0, parseInt(data[iterThree]['gene_rank'], 10) );
                        var entrezurl = 'http://www.ncbi.nlm.nih.gov/gene?Db=gene&Cmd=ShowDetailView&TermToSearch='+data[iterThree]['entrez_id'];
			dataTableThree.setCell(iterThree, 1, '<a href="'+entrezurl+'" class="embeddedAnchors" target="_blank">'+data[iterThree]['gene_name']+'</a>');
                        dataTableThree.setCell(iterThree, 2, '<a href="'+entrezurl+'" class="embeddedAnchors" target="_blank">'+data[iterThree]['entrez_id']+'</a>');
		}
                var cssNamesThree = {oddTableRow: 'testOddRow', tableRow: 'tableRow', hoverTableRow: 'hoveringTableRow', selectedTableRow: 'tableRowSelected'};
                optionsThree['cssClassNames'] = cssNamesThree;
		optionsThree['page']='enable';optionsThree['pageSize']=10; optionsThree['pagingSymbols']={prev:'prev', next:'next'}; optionsThree['pagingButtonsConfiguration']='auto';

                var total = Math.ceil(numRowsThree/10);
                document.getElementById('pageCntTopTargets').innerHTML = total;
		visualizationThree = new google.visualization.Table(document.getElementById('drawTabs3')); 
		google.visualization.events.addListener(visualizationThree, 'page', function(e) {
			document.getElementById('pageNumberingTabs3').innerHTML = e.page + 1;
		});
		visualizationThree.draw(dataTableThree, optionsThree);
	}

        function drawDavid(data) {
                dataTableFour = new google.visualization.DataTable();
                var numRowsFour = data.length;
		dataTableFour.addColumn('string', 'Function of miRNA');
		dataTableFour.addRows(numRowsFour);
		var davidURL = '';

		for(var iterFour = 0; iterFour < numRowsFour; iterFour++) {
	                var capitalizeDavid = capitalizeFirstLetter(data[iterFour]['mir_fun']);
			davidURL = '<a href="'+data[iterFour]['mir_fun_link']+'" class="embeddedAnchors" target="_blank">'+capitalizeDavid+'</a>';
                        dataTableFour.setCell(iterFour, 0, davidURL);
                }
                var cssNamesFour = {oddTableRow: 'testOddRow', tableRow: 'tableRow', hoverTableRow: 'hoveringTableRow', selectedTableRow: 'tableRowSelected'};
                optionsFour['cssClassNames'] = cssNamesFour;
		optionsFour['page']='enable'; optionsFour['pageSize']=10; optionsFour['pagingSymbols']={prev:'prev', next: 'next'}; optionsFour['pagingButtonsConfiguration']='auto';

		var total = Math.ceil(numRowsFour/10);
		document.getElementById('pageCntFunction').innerHTML = total;

                visualizationFour = new google.visualization.Table(document.getElementById('drawTabs4'));
		google.visualization.events.addListener(visualizationFour, 'page', function(e) {
			document.getElementById('pageNumberingTabs4').innerHTML = e.page + 1;
		});
		visualizationFour.draw(dataTableFour, optionsFour);
        }

        function drawDisease(data) {
                dataTableFive = new google.visualization.DataTable();
                var numRowsFive = data.length; 
		var diseaseURL='';
                dataTableFive.addColumn('string', 'Disease Name'); dataTableFive.addColumn('string', 'Regulation of miRNA'); 
		dataTableFive.addColumn('string', 'PMID');

		dataTableFive.addRows(numRowsFive);
                for(var iterFive = 0; iterFive < numRowsFive; iterFive++) {
			var capitalizeDisease = capitalizeFirstLetter(data[iterFive]['dis_name']);
			diseaseURL = '<a href="'+data[iterFive]['dis_link']+'" class="embeddedAnchors" target="_blank">'+capitalizeDisease+'</a>';
                        dataTableFive.setCell(iterFive, 0, diseaseURL);
                        dataTableFive.setCell(iterFive, 1, data[iterFive]['dis_reguln']);
                        dataTableFive.setCell(iterFive, 2, '<a href="http://www.ncbi.nlm.nih.gov/pubmed?term='+data[iterFive]['dis_pubId']+'" class="embeddedAnchors" target="_blank">'+data[iterFive]['dis_pubId']+'</a>');
                }
                var cssNamesFive = {oddTableRow: 'testOddRow', tableRow: 'tableRow', hoverTableRow: 'hoveringTableRow', selectedTableRow: 'tableRowSelected'};
                optionsFive['cssClassNames'] = cssNamesFive;
		optionsFive['page']='enable'; optionsFive['pageSize']=10; optionsFive['pagingSymbols']={prev:'prev', next:'next'}; optionsFive['pagingButtonsConfiguration']='auto';

		document.getElementById('pageCntDisease').innerHTML = Math.ceil(numRowsFive/10);
                visualizationFive = new google.visualization.Table(document.getElementById('drawTabs5'));
		google.visualization.events.addListener(visualizationFive, 'page', function(e) {
			document.getElementById('pageNumberingTabs5').innerHTML = e.page + 1;;
		});
		visualizationFive.draw(dataTableFive, optionsFive);
        }

        function drawPathways(data) {
                dataTableSix = new google.visualization.DataTable();
                var numRowsSix = data.length; var pathwayURL = '';
                dataTableSix.addColumn('string', 'Pathway');dataTableSix.addRows(numRowsSix);
                for(var iterSix = 0; iterSix < numRowsSix; iterSix++) {
			pathwayURL = '<a href="'+data[iterSix]['path_url']+'" class="embeddedAnchors" target="_blank">'+data[iterSix]['pathway']+'</a>';
                        dataTableSix.setCell(iterSix, 0, pathwayURL);
                }
                var cssNamesSix = {oddTableRow: 'testOddRow', tableRow: 'tableRow', hoverTableRow: 'hoveringTableRow', selectedTableRow: 'tableRowSelected'};
                optionsSix['cssClassNames'] = cssNamesSix;
		optionsSix['page']='enable'; optionsSix['pageSize']=10; optionsSix['pagingSymbols']={prev:'prev', next:'next'}; optionsSix['pagingButtonsConfiguration'] = 'auto';

		document.getElementById('pageCntPathway').innerHTML = Math.ceil(numRowsSix/10);
                visualizationSix = new google.visualization.Table(document.getElementById('drawTabs6'));
		google.visualization.events.addListener(visualizationSix, 'page', function(e) {
			document.getElementById('pageNumberingTabs6').innerHTML = e.page + 1;
		});
		visualizationSix.draw(dataTableSix, optionsSix);
        }

        // sets the number of pages according to the user selection.
        function setNumberOfPages(value) {
        if (value) {
        options['pageSize'] = parseInt(value, 10);
        options['page'] = 'enable';
        } else {
        options['pageSize'] = null;
        options['page'] = null;  
        }
        draw();
        }

        // Sets custom paging symbols "Prev"/"Next"
        function setCustomPagingButtons(toSet) {
        options['pagingSymbols'] = toSet ? {next: 'next', prev: 'prev'} : null;
        draw();  
        }

        function setPagingButtonsConfiguration(value) {
        options['pagingButtonsConfiguration'] = value;
        draw();
        }

